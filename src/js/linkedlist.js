function linkedList() {
	var list = {}, start = null, end = null, resultsStart = null, resultsEnd = null, indexes = [], endIndexes = [];
	function makeNode(data) {
		return {
			data : data,
			isAvailable : true,
			next : null
		};
	}
	function makeIndexNode(node) {
		return {
			node : node,
			next : null
		};
	}
	function makeResultNode(value1, value2) {
		return {
			value1 : value1,
			value2 : value2,
			next : null,
			prev : null
		};
	}
	function addIndex(index, node) {
		var indexNode = makeIndexNode(node);
		if (indexes[index]) {
			endIndexes[index].next = indexNode;
			endIndexes[index] = indexNode;
		} else {
			indexes[index] = indexNode;
			endIndexes[index] = indexNode;
		}
	}
	function addResultNode(value1, value2) {
		var node = makeResultNode(value1, value2);
		if (resultsStart === null) {
			resultsStart = node;
			resultsEnd = node;
		} else {
			resultsEnd.next = node;
			resultsEnd = node;
		}
	}
	function getResultsList() {
		var save = resultsStart, results = [];
		while (save != null) {
			results.push(save.value1 + save.value2);
			save = save.next;
		}
		return results;
	}
	function findNextAvailbleIndexNode(index) {
		var save = indexes[index];
		while (save != null && !save.node.isAvailable) {
			save = save.next;
		}
		return save;
	}
	list.add = function(data) {
		if (data && data.length === 2) {
			var values = data.split("");
			if (!isNaN(values[0]) && !isNaN(values[1])
					&& (values[0] !== values[1])) {
				var node = makeNode(data);
				if (start === null) {
					start = node;
					end = node;
				} else {
					end.next = node;
					end = node;
				}
				addIndex(values[0], node);
				addIndex(values[1], node);
			}
		}
	};
	list.getIndexesSeries = function(index) {
		var save = indexes[index], results = [];
		while (save != null) {
			results.push(save.node.data);
			save = save.next;
		}
		return results;
	};
	list.findSeries = function() {
		var currentNode = null, index = 0, value1, value2;
		while (indexes[index] === undefined) {
			index++;
			if (index === 10) {
				return;
			}
		}
		currentNode = indexes[index];
		value1 = index;
		while (currentNode) {
			value2 = currentNode.node.data.replace(value1, "").split("")[0];
			currentNode.node.isAvailable = false;
			addResultNode(value1, value2);
			currentNode = findNextAvailbleIndexNode(value2);
			value1 = value2;
		}
		return getResultsList();
	};
	return list;
}