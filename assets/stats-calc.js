generateCrewMembers('Mickey');

document.getElementById('character').addEventListener('change', function () {
    const selectedCharacter = this.value;
    generateCrewMembers(selectedCharacter); // Call with the currently selected character
});

function generateCrewMembers(selectedCharacter) {
    // Fetch crew data from a separate JSON file
    fetch('./json/crew_data.json')
        .then(response => response.json())
        .then(crewData => {
            const container = document.querySelector('.crew-members');
            container.innerHTML = ''; // Clear existing content

            crewData.forEach(member => {
                if (member.characters && member.characters.includes(selectedCharacter)) {
                    const statsData = JSON.stringify(member.stats); // Convert array to JSON string
                    const starRatingHtml = Array.from({length: 5}, (_, i) =>
                        `<i class="${i < member.star ? 'fas' : 'far'} fa-star" onclick="setStar(this, ${i + 1})"></i>`
                    ).join('');

                    const crewMemberHtml = `
                      <div class="crew-member-container">
                        <img src="${member.image}" data-stats='${statsData}' data-star="${member.star}" data-epic="${member.epic}" onclick="selectImage(this)" style="cursor: pointer;">
                        <div class="crew-member" data-crew="member${member.name}">
                          <div class="stars hidden">${starRatingHtml}</div>
                          <div class="crew-member-stats text-center">${member.stats.join(', ')}</div>
                        </div>
                      </div>
                    `;
                    container.innerHTML += crewMemberHtml; // Append the new crew member to the container
                }
            });
        })
        .catch(error => {
            console.error('Error fetching crew data:', error);
        });
}


function setStar(starElement, starLevel) {
    const crewMemberContainer = starElement.closest('.crew-member-container');
    const imgElement = crewMemberContainer.querySelector('img'); // Assuming there's only one img per container

    // Now set the attribute
    imgElement.setAttribute('data-star', starLevel);

    // Update stars visually as before
    const stars = crewMemberContainer.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        star.classList.toggle('fas', index < starLevel); // Filled for index < starLevel
        star.classList.toggle('far', index >= starLevel); // Outlined otherwise
    });
}

function selectImage(element) {
    const crewMemberContainer = element.closest('.crew-member-container');
    // Toggle selection state visually (e.g., by changing the border)
    crewMemberContainer.classList.toggle('selected'); // Ensure you have CSS to visually indicate selection
    // Find the .stars div for the selected crew member and show it
    const starsDiv = crewMemberContainer.querySelector('.stars');
    starsDiv.classList.toggle('hidden');
}

fetch('./json/stats_levels.json')
    .then(response => response.json())
    .then(data => {
        inputJson = data;
        // Now you can use the 'data' object which contains the JSON data

        document.getElementById('calculateStats').addEventListener('click', function () {
            calculateStats();
        });

        function calculateStats() {
            const selectedCharacterElement = document.getElementById('character');
            const selectedCharacter = selectedCharacterElement.value;
            const selectedLevel = parseInt(document.getElementById('level').value);
            const selectedCharacterOption = selectedCharacterElement.options[selectedCharacterElement.selectedIndex];
            const characterType = selectedCharacterOption.getAttribute('data-type'); // Get the character type from the selected option
            const characterClass = selectedCharacterOption.getAttribute('data-class'); // Get the character class from the selected option

            if (!selectedCharacter || isNaN(selectedLevel) || selectedLevel < 1 || selectedLevel > 50) {
                alert('Please enter a level from 1 to 50.');
                return;
            }

            // Initialize modifiers
            let statModifiers = {};
            let epicMultiplier = 1;

            // Define multipliers for each type
            const epicMultipliers = {
                common: [1.03, 1.05, 1.06, 1.07, 1.08],
                rare: [1.04, 1.06, 1.08, 1.09, 1.10],
                epic: [1.05, 1.09, 1.12, 1.14, 1.15] // Original epic multipliers
            };
            // Determine which multiplier array to use based on the character type
            const currentMultipliers = epicMultipliers[characterType] || epicMultipliers.epic; // Default to epic if type is missing or incorrect

            const selectedContainers = document.querySelectorAll('.crew-member-container.selected');
            selectedContainers.forEach(container => {
                const imgElement = container.querySelector('img'); // Assuming one img per container
                const stats = JSON.parse(imgElement.getAttribute('data-stats'));
                const star = parseInt(imgElement.getAttribute('data-star'));
                const isEpic = imgElement.getAttribute('data-epic') === 'true';

                if (isEpic) {
                    // Adjust epicMultiplier based on the star level of this epic image
                    epicMultiplier *= currentMultipliers[star - 1]; // Assuming star levels are 1-indexed
                } else {
                    // Apply increases for non-epic images based on their stat impact and star level
                    const increases = {1: 200, 2: 350, 3: 450, 4: 525, 5: 600};
                    stats.forEach(stat => {
                        if (!statModifiers[stat]) statModifiers[stat] = 0;
                        statModifiers[stat] += increases[star] || 0; // Default to 0 if star level is undefined
                    });
                }
            });

            let progressionResult = calculateIntervals(inputJson[selectedCharacter], classStatPatterns[characterClass]);
            let allProgressions = fillMissingLevels(progressionResult);

            if (!allProgressions) {
                alert('Data for the selected character is not available.');
                return;
            }

            const characterProgression = allProgressions;
            const statsAtSelectedLevel = {};

            Object.keys(characterProgression).forEach(stat => {
                statsAtSelectedLevel[stat] = characterProgression[stat]['level' + selectedLevel];
            });

            Object.keys(statsAtSelectedLevel).forEach(stat => {
                if (statModifiers[stat]) {
                    statsAtSelectedLevel[stat] += statModifiers[stat];
                }
                statsAtSelectedLevel[stat] = Math.round(statsAtSelectedLevel[stat] * epicMultiplier);
            });

            const resultContainer = document.getElementById('result');
            // Modify this line to conditionally apply the green color
            resultContainer.innerHTML = `<table class="stat-table table-auto w-full bg-black bg-opacity-50"><thead><tr><th>Stat</th><th>Value</th></tr></thead><tbody>${Object.entries(statsAtSelectedLevel).map(([stat, value]) => {
                // Check if the level is in the pattern for the current stat and class
                const isLevelInPattern = classStatPatterns[characterClass][stat]?.includes(selectedLevel);
                // Conditionally set the class for green color
                const valueClass = isLevelInPattern ? 'text-green-500' : '';
                const asterix = isLevelInPattern ? '*' : '';
                return `<tr><td class="p-5 text-center">${stat}</td><td class="p-5 text-center ${valueClass}">~ ${(Math.round((value - 15) / 50) * 50)} ${asterix}</td></tr>`;
            }).join('')}</tbody></table><p class="text-green-500">* The stat in green is the stat gained from the current selected level.</p>`;
        }

        const classStatPatterns = {
            "Defender": {
                "Combat": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
                "Boost": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
                "Top Speed": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
                "Handling": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                "Acceleration": [6, 11, 16, 21, 26, 31, 36, 41, 46, 50]
            },
            "Speedster": {
                "Acceleration": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
                "Top Speed": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
                "Handling": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
                "Combat": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                "Boost": [6, 11, 16, 21, 26, 31, 36, 41, 46, 50]
            },
            "Trickster": {
                "Boost": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
                "Handling": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
                "Acceleration": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
                "Top Speed": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                "Combat": [6, 11, 16, 21, 26, 31, 36, 41, 46, 50]
            },
            "Brawler": {
                "Top Speed": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
                "Combat": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
                "Boost": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
                "Acceleration": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                "Handling": [6, 11, 16, 21, 26, 31, 36, 41, 46, 50]
            }
        };
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function calculateIntervals(characterData, intervals) {
    let statProgressionCorrected = {};

    Object.keys(characterData).forEach(stat => {
        let levelsData = characterData[stat];
        let levelValues = Object.keys(levelsData).reduce((acc, key) => {
            let level = parseInt(key.replace('level', ''));
            acc[level] = levelsData[key];
            return acc;
        }, {});

        let increases = {};
        Object.keys(levelValues).forEach(startLevel => {
            startLevel = parseInt(startLevel);
            let possibleEndLevels = Object.keys(levelValues).map(l => parseInt(l)).filter(l => l > startLevel);
            let endLevel = possibleEndLevels.length > 0 ? Math.min(...possibleEndLevels) : null;
            if (endLevel) {
                let totalIncrease = levelValues[endLevel] - levelValues[startLevel];
                let increaseLevels = intervals[stat].filter(i => i > startLevel && i <= endLevel);
                let increaseCount = increaseLevels.length;
                if (increaseCount > 0) {
                    increases[startLevel] = totalIncrease / increaseCount;
                }
            }
        });

// Now, let's calculate the increase from level 1 specifically
// This is assuming we want to find the first increase interval after level 1 and calculate the increase to it
        if (levelValues.hasOwnProperty('1')) { // Check if we have a stat value for level 1
            let firstIntervalAfterOne = intervals[stat].find(i => i > 1);
            if (firstIntervalAfterOne) {
                let endLevelValue = levelValues[`level${firstIntervalAfterOne}`];
                if (endLevelValue) { // Ensure we have a value for the end level
                    let totalIncreaseFromOne = endLevelValue - levelValues['1'];
                    let increaseLevelsFromOne = intervals[stat].filter(i => i >= 1 && i <= firstIntervalAfterOne).length - 1;
                    if (increaseLevelsFromOne > 0) { // Avoid division by zero
                        let increaseFromOne = totalIncreaseFromOne / increaseLevelsFromOne;
                        increases['1'] = increaseFromOne; // Store the calculated increase from level 1
                    }
                }
            }
        }

// Assume levelValues includes up to level 45
// Calculate the increase for levels above 45 up to level 50
        let increaseRateChanged = false;
        let lastKnownLevel = Math.max(...Object.keys(levelValues).map(l => parseInt(l)));
        if (lastKnownLevel === 45) {
            // Assume the pattern of increases is somewhat linear for simplicity
            // Calculate the rate of increase based on the last known intervals
            let lastIncreaseValues = Object.values(increases).slice(-2); // Get the last two increases
            if (lastIncreaseValues.length === 2) {
                let increaseRate = lastIncreaseValues[1] - lastIncreaseValues[0]; // Difference in the last two increases
                // Apply this rate to estimate increases for levels 46 to 50
                for (let level = lastKnownLevel; level <= 50; level++) {
                    let prevIncrease = increases[level - 1] || lastIncreaseValues[1]; // Use the last known or the previous increase
                    //increases[level] = prevIncrease + increaseRate;


                    if (increaseRateChanged) {
                        increases[level] = prevIncrease;
                    } else {
                        increases[level] = prevIncrease + increaseRate;
                    }
                    increaseRateChanged = true;
                }
            }
        }

// Initial setup: Extracting the lowest level's stat as the starting point.
        let currentStat = levelValues[Math.min(...Object.keys(levelValues).map(k => parseInt(k)))];
        statProgressionCorrected[stat] = {};

// Iterating over each level in the stat's intervals.
        intervals[stat].forEach(level => {
            // Finding the highest starting level less than the current level to apply its increase.
            let startLevels = Object.keys(increases).map(l => parseInt(l)).filter(l => l < level);
            let startLevel = startLevels.length > 0 ? Math.max(...startLevels) : null;

            // Identifying the next level for which a value is specified, to determine if we're applying the right increase.
            let endLevels = Object.keys(levelValues).map(l => parseInt(l)).filter(l => l >= level);
            let endLevel = endLevels.length > 0 ? Math.min(...endLevels) : null;

            // If there's a valid start level with a defined increase, apply this increase to the current stat.
            if (startLevel !== null && increases[startLevel] !== undefined) {
                currentStat += increases[startLevel];
            }

            // Rounding the current stat for the level and storing it.
            statProgressionCorrected[stat][`level${level}`] = Math.round(currentStat);
        });


        // Ensure the final known stat values are added for completeness
        Object.keys(levelValues).forEach(level => {
            let key = `level${level}`;
            if (!(key in statProgressionCorrected[stat])) {
                statProgressionCorrected[stat][key] = levelValues[level];
            }
        });
    });

    return statProgressionCorrected;
}

function fillMissingLevels(statData) {
    const filledData = {};

    // Iterate over each stat
    for (const statName in statData) {
        const statValues = statData[statName];
        filledData[statName] = {};

        let previousLevelValue = null;

        // Iterate over levels 1 to 45
        for (let level = 1; level <= 50; level++) {
            // If the current level is provided, use its value
            if (statValues[`level${level}`] !== undefined) {
                previousLevelValue = statValues[`level${level}`];
                filledData[statName][`level${level}`] = previousLevelValue;
            } else {
                // If the current level is missing, use the value of the previous level
                if (previousLevelValue !== null) {
                    filledData[statName][`level${level}`] = previousLevelValue;
                } else {
                    // If there's no previous value (i.e., level 1 is missing), set it to 0
                    filledData[statName][`level${level}`] = 0;
                }
            }
        }
    }

    return filledData;
}
