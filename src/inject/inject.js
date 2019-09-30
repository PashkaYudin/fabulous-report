chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			// This part of the script triggers when page is done loading
			// console.log("Hello. This message was sent from scripts/inject.js");
			let tableData = document.querySelector('table.sortable.source');
			let tableDataRows = document.querySelectorAll('tr');
			console.log(tableDataRows);
			let arrTestData = [];
			tableDataRows.forEach((el, idx) => {
				if (idx === 0) return;
				let targetTd = el.querySelector('td:nth-child(3)')
				let targetTdText = targetTd.textContent.match(/[0-9]|[-+]/g);
				let preparedTargetTdText = '';

				targetTdText.forEach((el, idx, arr) => {
					if (el === '-' || el === '+') {
						preparedTargetTdText += ' ' + el;
					} else {
						preparedTargetTdText += el;
					}

				})

				if (!preparedTargetTdText.match(/[\-]|[\+]/)) {
					preparedTargetTdText = preparedTargetTdText.slice(0, preparedTargetTdText.length - 1) + ' 0';
				}

				arrTestData.push({
					// targetTdText: preparedTargetTdText,
					val1: parseInt(preparedTargetTdText.split(' ')[0]),
					val2: parseInt(preparedTargetTdText.split(' ')[1])
				});
			})

			// console.log(arrTestData);

			const fabalous = () => {
				tableDataRows.forEach((el, idx, arr) => {
					if (idx === 0) return
					let tdEl = document.createElement('td');
					let i = arrTestData[idx - 1];
					// TODO: проверить
					let diff = Math.round((i.val1 / (i.val1 + i.val2) * 100)) - 100

					if (diff >= 0) tdEl.innerHTML = "<span class='green'>" + diff + " %</span>";
						else tdEl.innerHTML = "<span class='red'>" + diff + " %</span>";

					el.append(tdEl)
				})
			}

			fabalous();
		}
	}, 10);
});