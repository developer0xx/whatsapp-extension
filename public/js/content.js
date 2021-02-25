
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log('content script message received', request.message);
		switch (request.message) {
			case "broadcast_start":
				broadcast(request.data);
				break;
			case 'reply_start':
				reply(request.data);
				break;
			case 'followup_start':
				followUp(request.data);
				break;
		}
	}
);

const broadcast = async ({numbers, text}) => {
	console.log('broadcast start---', numbers, text);
	for (let s = 0; s < numbers.length; s++) {
		if (numbers[s] === "") continue;
		try {
			const a = await openChat(numbers[s]);
			console.log("Chat Open", a)
		} catch (e) {
			console.log("INVALID", e);
			continue;
		}
		try {
			sendText(text);
			console.log('Send Message', numbers[s]);
		} catch (e) {
			console.log('Send Message Error', e);
		}
	}
};

const reply = async ({numbers, keywords}) => {
	for (let s = 0; s < numbers.length; s++) {
		if (numbers[s] === "") continue;
		try {
			const a = await openChat(numbers[s]);
			console.log("Chat Open", a)
		} catch (e) {
			console.log("INVALID", e);
			continue;
		}
		if ($("div.focusable-list-item").last().hasClass("message-out")) continue;
		$($("div.focusable-list-item.message-in").get().reverse()).each(function (index, el) {
			const text = $(this).text();
			for (let i = 0; i < keywords.length; i ++) {
				if (text.includes(keywords[i].keyText)) {
					sendText(keywords[i].valueText);
					return false;
				}
			}
		})
	}
};

const followUp = async ({numbers, keywords}) => {
	for	(let s = 0; s < numbers.length; s++) {
		try {
			const a = await openChat(numbers[s]);
			console.log("Chat Open", a)
		} catch (e) {
			console.log("INVALID", e);
			continue;
		}
		if ($("div.focusable-list-item").last().hasClass("message-in")) continue;
		let dateString = $("div.focusable-list-item").last().find("div.copyable-text").attr("data-pre-plain-text").split(']')[0];
		dateString = dateString.substring(1);
		console.log('datestring-----', dateString, new Date(dateString));
		const timeDiff = parseInt((new Date().getTime() - new Date(dateString).getTime()) / (60 * 1000));
		for (let i = 0; i < keywords.length; i++) {
			for (let j = i + 1; j < keywords.length; j++) {
				if (parseInt(keywords[i].keyText) < parseInt(keywords[j].keyText)) {
					[keywords[i], keywords[j]] = [keywords[j], keywords[i]]
				}
			}
		}
		console.log('keywords---', keywords, timeDiff);
		for (let i = 0; i < keywords.length; i++) {
			if (parseInt(keywords[i].keyText) <= timeDiff) {
				sendText(keywords[i].valueText);
				break;
			}
		}
	}
};

async function openChat(e) {
	return new Promise(t => {
		openChatUrl(e).then(() => {
			setTimeout(async function () {
				let e = !1;
				e = await hasOpened(), t(e)
			}, 2e3)
		})
	})
}

function openChatUrl(e) {
	return new Promise(t => {
		let n = document.getElementById("wamessages");
		n || ((n = document.createElement("a")).id = "wamessages", document.body.append(n)), n.setAttribute("href", `https://api.whatsapp.com/send?phone=${e}`), setTimeout(() => {
			n.click(), t()
		}, 500)
	})
}

async function hasOpened() {
	let e = !0;
	return await waitTillWindow(), document.querySelector('[data-animate-modal-popup="true"]') && (e = !1), e
}

function sendText(e) {
	messageBox = document.querySelectorAll("[contenteditable='true']")[1], event = document.createEvent("UIEvents"), messageBox.innerHTML = e.replace(/ /gm, " "), event.initUIEvent("input", !0, !0, window, 1), messageBox.dispatchEvent(event), eventFire(document.querySelector('span[data-icon="send"]'), "click")
	console.log('message sent----', e);
}

async function eventFire(e, t) {
	var n = document.createEvent("MouseEvents");
	return n.initMouseEvent(t, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), new Promise(function (t) {
		var o = setInterval(function () {
			document.querySelector('span[data-icon="send"]') && (e.dispatchEvent(n), t((clearInterval(o), "BUTTON CLICKED")))
		}, 500)
	})
}
async function waitTillWindow() {
	let i = 0;
	document.querySelector('[data-animate-modal-popup="true"]') && !document.querySelector('[data-animate-modal-body="true"]').innerText.includes("invalid") && setTimeout(async function () {
		if (i < 120) await waitTillWindow()
		i++;
	}, 500)
}

function sleep(e) {
	return new Promise(t => setTimeout(t, e))
}
