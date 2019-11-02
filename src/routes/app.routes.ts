import { Response, Router } from 'express';

import { flatten } from 'flat';

// test data in json file
import * as data from '../data/test-data.json';

const router = Router();

// Define routes
router.get('/transactions', (req, res: Response) => {
	const allRecords: any = data;
	if (req.query.flat) {
		return res.send(flatten(constructResponse(allRecords.default, req.query)));
	}
	return res.send(constructResponse(allRecords.default, req.query));
});

/**
 * construct response data
 * @param { array } rawData - transaction graphs
 * @param {any} params - query params
 */
function constructResponse(rawData: any[], params: any) {
	// destructure query params
	const { transactionId, confidenceLevel } = params;
	const parentObject: any = findParent(rawData, transactionId);
	if (Boolean(parentObject && parentObject.children)) {
		parentObject.children = filterChildren(
			parentObject.children,
			parentObject,
			confidenceLevel,
		);
	}
	return parentObject;
}

/**
 * search for parent
 * @param { array } rawData - transaction graphs
 * @param { string } transID - transaction ID
 * @returns parent object with nested children if any {}
 */
function findParent(rawData: any[], transID: string) {
	let result: any;
	function searchParent(records: any, id: string): boolean {
		return records.some((transaction: any) => {
			if (transaction.id === transID) {
				result = transaction;
				return true;
			} else if (transaction.children) {
				return searchParent(transaction.children, id);
			}
		});
	}

	const transFound = searchParent(rawData, transID);
	if (transFound) {
		// remove connection info property
		const { connectionInfo, ...newResult } = result;
		return newResult;
	}
	return {};
}

/**
 * filter children based on  'confidenceLevel'
 * @param { Array } transactions - parent's children transations
 * @param { any } parentTrans - parent transaction
 * @param { number } confidenceLevel - confidence level
 * @returns array of transactions
 */
function filterChildren(transactions: any[], parentTrans: any, confidenceLevel: number) {
	transactions.forEach((transaction: any) => {
		if (transaction && transaction.children) {
			transaction.children = filterChildren(
				transaction.children,
				transaction,
				confidenceLevel,
			);
		}
	});
	return transactions
		.filter((trans: any) => +trans.connectionInfo.confidence >= +confidenceLevel)
		.map((child: any) => {
			// construct the new properties
			child.combinedConnectionInfo = {
				confidence:
					((parentTrans.connectionInfo && parentTrans.connectionInfo.confidence) || 1) *
					child.connectionInfo.confidence,
				types: [],
			};

			if (parentTrans.combinedConnectionInfo) {
				child.combinedConnectionInfo.types = [
					...parentTrans.combinedConnectionInfo.types,
					child.connectionInfo.type,
				];
			} else {
				child.combinedConnectionInfo.types = [child.connectionInfo.type];
			}
			return child;
		});
}

export const appRoutes = router;
