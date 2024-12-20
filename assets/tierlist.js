// script.js
const character_images = [
    { "name": "Mickey", "shards": "racer_shards/mickey_shards.png", "id": 1 },
    { "name": "Donald", "shards": "racer_shards/donald.png", "id": 2 },
    { "name": "Goofy", "shards": "racer_shards/goofy.png", "id": 3 },
    { "name": "Daisy", "shards": "racer_shards/daisy.png", "id": 4 },
    { "name": "Minnie", "shards": "racer_shards/minnie.png", "id": 5 },
    { "name": "Steamboat Mickey", "shards": "racer_shards/sbmickey.png", "id": 6 },
    { "name": "Steamboat Pete", "shards": "racer_shards/pete.png", "id": 7 },
    { "name": "Belle", "shards": "racer_shards/belle.png", "id": 8 },
    { "name": "Beast", "shards": "racer_shards/beast.png", "id": 9 },
    { "name": "Gaston", "shards": "racer_shards/gaston.png", "id": 10 },
    { "name": "Hercules", "shards": "racer_shards/hercules.png", "id": 11 },
    { "name": "Meg", "shards": "racer_shards/meg.png", "id": 12 },
    { "name": "Hades", "shards": "racer_shards/hades.png", "id": 13 },
    { "name": "Mowgli", "shards": "racer_shards/mowgli.png", "id": 14 },
    { "name": "Baloo", "shards": "racer_shards/baloo.png", "id": 15 },
    { "name": "Swann", "shards": "racer_shards/swann.png", "id": 16 },
    { "name": "Jack Sparrow", "shards": "racer_shards/jack.png", "id": 17 },
    { "name": "Davy Jones", "shards": "racer_shards/davy_jones.png", "id": 18 },
    { "name": "Barbossa", "shards": "racer_shards/barbossa.png", "id": 19 },
    { "name": "Tia", "shards": "racer_shards/tia.png", "id": 20 },
    { "name": "Will", "shards": "racer_shards/will.png", "id": 21 },
    { "name": "Mike", "shards": "racer_shards/mike.png", "id": 22 },
    { "name": "Celia Mae", "shards": "racer_shards/celia.png", "id": 23 },
    { "name": "Sulley", "shards": "racer_shards/sulley.png", "id": 24 },
    { "name": "Randall", "shards": "racer_shards/randall.png", "id": 25 },
    { "name": "Mulan", "shards": "racer_shards/mulan.png", "id": 26 },
    { "name": "Shang", "shards": "racer_shards/shang.png", "id": 27 },
    { "name": "Figment", "shards": "racer_shards/figment.png", "id": 28 },
    { "name": "Oswald", "shards": "racer_shards/oswald.png", "id": 29 },
    { "name": "Ortensia", "shards": "racer_shards/ortensia.png", "id": 30 },
    { "name": "Wall-E", "shards": "racer_shards/walle.png", "id": 31 },
    { "name": "Eve", "shards": "racer_shards/eve.png", "id": 32 },
    { "name": "Jessie", "shards": "racer_shards/jessie.png", "id": 33 },
    { "name": "Bo Peep", "shards": "racer_shards/bo_peep.png", "id": 34 },
    { "name": "Woody", "shards": "racer_shards/woody.png", "id": 35 },
    { "name": "Buzz Lightyear", "shards": "racer_shards/buzz.png", "id": 36 },
    { "name": "Angel", "shards": "racer_shards/angel.png", "id": 37 },
    { "name": "Gantu", "shards": "racer_shards/gantu.png", "id": 38 },
    { "name": "Jumba", "shards": "racer_shards/jumba.png", "id": 39 },
    { "name": "Lilo", "shards": "racer_shards/lilo.png", "id": 40 },
    { "name": "Stitch", "shards": "racer_shards/stitch.png", "id": 41 },
    { "name": "Aladdin", "shards": "racer_shards/aladdin.png", "id": 42 },
    { "name": "Jasmine", "shards": "racer_shards/jasmine.png", "id": 43 },
    { "name": "Jafar", "shards": "racer_shards/jafar.png", "id": 44 },
    { "name": "Genie", "shards": "racer_shards/genie.png", "id": 45 },
    { "name": "Kristoff", "shards": "racer_shards/kristoff.png", "id": 46 },
    { "name": "Hans", "shards": "racer_shards/hans.png", "id": 47 },
    { "name": "Anna", "shards": "racer_shards/anna.png", "id": 48 },
    { "name": "Elsa", "shards": "racer_shards/elsa.png", "id": 49 },
    { "name": "Olaf", "shards": "racer_shards/olaf.png", "id": 50 },
    { "name": "Ariel", "shards": "racer_shards/ariel.png", "id": 51 },
    { "name": "Prins Eric", "shards": "racer_shards/princeeric.png", "id": 52 },
    { "name": "King Triton", "shards": "racer_shards/king.png", "id": 53 },
    { "name": "Ursula", "shards": "racer_shards/ursula.png", "id": 54 },
    { "name": "Felix", "shards": "../racer_shards/felix.png", "id": 55 },
    { "name": "Vanellope", "shards": "../racer_shards/vanellope.png", "id": 56 },
    { "name": "Ralph", "shards": "../racer_shards/ralph.png", "id": 57 },
    { "name": "King Candy", "shards": "../racer_shards/kingcandy.png", "id": 58 },
    { "name": "Calhoun", "shards": "../racer_shards/calhoun.png", "id": 59 },
    { "name": "Kermit the Frog", "shards": "../racer_shards/kermit.png", "id": 60 },
    { "name": "Piggy", "shards": "racer_shards/piggy.png", "id": 61 },
    { "name": "Joy", "shards": "../racer_shards/joy.png", "id": 62 },
    { "name": "Fear", "shards": "../racer_shards/fear.png", "id": 63 },
    { "name": "Disgust", "shards": "../racer_shards/disgust.png", "id": 64 },
    { "name": "Anger", "shards": "../racer_shards/anger.png", "id": 65 },
    { "name": "Sadness", "shards": "../racer_shards/sadness.png", "id": 66 },
    { "name": "Anxiety", "shards": "racer_shards/anxiety.png", "id": 67 },
    { "name": "Ennui", "shards": "racer_shards/ennui.png", "id": 68 },
    { "name": "Maleficent", "shards": "racer_shards/maleficent.png", "id": 69 },
    { "name": "Cruella", "shards": "racer_shards/cruella.png", "id": 70 },
    { "name": "Dr. Finkelstein", "shards": "racer_shards/dr_finkelstein.png", "id": 71 },
    { "name": "Jack Skellington", "shards": "racer_shards/jack_skellington.png", "id": 72 },
    { "name": "Oogie Boogie", "shards": "racer_shards/oogie_boogie.png", "id": 73 },
    { "name": "Sally", "shards": "racer_shards/sally.png", "id": 74 },
    { "name": "Rapunzel", "shards": "racer_shards/rapunzel.png", "id": 74 }
];


// Use the embedded characters array directly
// Function to make characters draggable
$(document).ready(function () {
    // Load characters from the embedded array
    $.each(character_images, function (key, val) {
        $('#characterPool').append('<div class="character" data-id="' + val.id + '"><img crossorigin="anonymous" src="' + val.shards + '" loading="lazy" alt="' + val.name + '"></div>');
    });

    // Make the pool characters draggable
    $('#characterPool .character').draggable({
        helper: "clone",
        revert: "invalid"
    });

    function makeTierDroppable(tierId) {
        $(tierId).droppable({
            accept: ".character",
            drop: function (event, ui) {
                if (!ui.draggable.hasClass('dropped')) {
                    // If character is from the pool, append a clone to the tier
                    var clone = ui.helper.clone();
                    clone.addClass('smaller');
                    $(this).append(clone);
                    makeCharactersMovable(clone); // Make the clone movable within tiers
                } else {
                    // If character is already in a tier, move it to the new tier
                    ui.draggable.appendTo(this);
                }
            }
        });
    }

    function makeCharactersMovable(selector) {
        $(selector).addClass('dropped').draggable({
            revert: "invalid",
            containment: 'document',
            stop: function (event, ui) {
                $(this).draggable('option', 'revert', 'invalid');
            },
            start: function (event, ui) {
                // Apply a high z-index value when dragging starts
                ui.helper.css('z-index', '1000');
            },
        });
    }

    function addNewTier() {
        // Incrementing tier ID or using a timestamp could help ensure uniqueness
        const newTierId = 'tier' + Date.now();
        const newTierHtml = `
            <div class="flex items-center items-stretch mb-2">
                <div class="tier-name flex items-center justify-center w-20 md:w-32 text-center p-2 bg-gray-700 rounded-l-lg" style="min-height: 60px;" contenteditable="true" data-ph="New Tier"></div>
                <div class="tier mobile-resize-tier flex-grow relative p-1 bg-gray-600 rounded-r-lg ui-droppable" style="min-height: 80px;" id="${newTierId}"></div>
            </div>
        `;

        $('#tierlist-container').append(newTierHtml);
        makeTierDroppable(`#${newTierId}`); // Make the new tier droppable
    }

    // Event listener for the Add New Tier button
    $('#addTier').click(addNewTier);
    // Make the tiers droppable
    makeTierDroppable('.tier');
    // Initially make all characters movable
    makeCharactersMovable('.character');
});

$('#saveTierList').click(function () {
    var tierListContainer = document.getElementById('tierlist-container');
    // html2canvas(tierListContainer).then(function (canvas) {
    //     // Now that html2canvas returns a Promise, you can use .then()
    //     var link = document.createElement('a');
    //     link.download = 'TierList.png';
    //     link.href = canvas.toDataURL('image/png');
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }).catch(function (error) {
    //     // It's a good practice to catch and handle any errors.
    //     console.error('html2canvas error:', error);
    // });
    
    
    html2canvas(tierListContainer).then(canvas => {
        canvas.toBlob(blob => {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
                .then(() => {
                    alert("Image saved and copied to clipboard!");
                })
                .catch(err => {
                    console.error("Failed to copy image to clipboard: ", err);
                    alert("Image saved but failed to copy to clipboard.");
                });
        });

        // document.body.removeChild(cloneList);
    });
});

$(document).ready(function () {
    // Listen for color picker changes
    $('.color-picker').on('input', function () {
        var targetSelector = $(this).data('target');
        var color = $(this).val();
        $(targetSelector).css('background-color', color);
    });
});

