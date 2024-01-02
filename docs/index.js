/**
 * @typedef {Event} BeforeInstallPromptEvent
 * @property {() => void} prompt - The prompt() method of the BeforeInstallPromptEvent interface allows a developer to show the "install prompt" at a time of their own choosing. Typically, this will be called in the event handler for the app's custom install UI.
 * This method must be called in the event handler for a user action (such as a button click) and may only be called once on a given BeforeInstallPromptEvent instance.
 * @property {Promise<{outcome: "accepted" | "dismissed", platform: string}>} userChoice - The userChoice property of the BeforeInstallPromptEvent interface represents the installation choice that the user made, when they were prompted to install the app.
 */

window.addEventListener('beforeinstallprompt',
    /**
     * @param {BeforeInstallPromptEvent} e
     */
    function (e) {
        const addBtn = $('.add-button');

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
shareBtn.on('click', () => {
	if (!lastWert) return;
	const funke = $('input[name="funke"]:checked').val();
	console.log({funke})

	const shareData = {
		title: `BOS-Gruppe '${lastWert.label}'`,
		text: funke === 'motorola' ?
			`Wechseln Sie in die BOS-Gruppe '${lastWert.label}' 
Motorola-Geräte:
    - Betriebsart auswählen (DMO/TMO)
    - Kurzwahl '${lastWert.value}' eingeben, danach '*' drücken
    - Anlage auswählen` :
			`Wechseln Sie in die BOS-Gruppe '${lastWert.label}'
Sepura-Geräte:
    - Modustaste drücken
    - Nummer '${lastWert.value}' eingeben
    - bestätigen
`
	}
	navigator.share(shareData)
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
})