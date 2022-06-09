// Code to handle install prompt on desktop
const addBtn = $('.add-button').css("display", "none");

window.addEventListener('beforeinstallprompt', e => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	// Update UI to notify the user they can add to home screen
	addBtn.css("display", "initial");

	addBtn.click(() => {
		if (!e) return
		// hide our user interface that shows our A2HS button
		addBtn.css("display", "none");
		// Show the prompt
		e.prompt();
		// Wait for the user to respond to the prompt
		e.userChoice.then(choiceResult => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			e = null;
		});
	});
});

const shareBtn = $('.share-button')
shareBtn.click(() => {
	if (!lastWert) return;

	const shareData = {
		title: `BOS-Gruppe '${lastWert.label}'`,
		text:
`Wechseln Sie in die BOS-Gruppe '${lastWert.label}': 
    - Betriebsart auswählen (DMO/TMO)
    - Kurzwahl '${lastWert.value}' eingeben, danach '*' drücken
    - Anlagen auswählen`
	}
	navigator.share(shareData)
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
})