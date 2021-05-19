let dublicationError;
(function () {
    document.characterSet = 'UTF-8';

    let fontAbel = document.createElement('link');
    fontAbel.setAttribute('rel', 'stylesheet');
    fontAbel.setAttribute('href', 'https://fonts.googleapis.com/css?family=Abel');
    document.head.appendChild(fontAbel);

    let fontChanga = document.createElement('link');
    fontChanga.setAttribute('rel', 'stylesheet');
    fontChanga.setAttribute('href', 'https://fonts.googleapis.com/css?family=Changa');
    document.head.appendChild(fontChanga);

    //create stylesheet
    let stylesht = document.createElement('link');
    stylesht.setAttribute('rel', 'stylesheet');
    stylesht.setAttribute('href', 'http://localhost:5000/static/editor/css/SpaceInvader/ship.css');
    stylesht.setAttribute('type', 'text/css');
    document.head.appendChild(stylesht);


    let dustBin = document.createElement('img');
    dustBin.setAttribute('src', 'http://localhost:5000/static/editor/img/SpaceInvader/trashOrange.png');
    dustBin.setAttribute('id', 'trashcan');
    dustBin.setAttribute('id', 'dustBin');
    document.body.appendChild(dustBin);
    let dustbin = document.getElementById('dustBin');

    let menuWrapper = document.createElement('div');
    menuWrapper.setAttribute('id', 'menuWrapper');
    document.body.appendChild(menuWrapper);
    menuWrapperDiv = document.getElementById('menuWrapper');

    //create Note creator
    let postIt = document.createElement('BUTTON');
    postIt.innerHTML = '&#9997;';
    postIt.setAttribute('id', 'postIT');
    menuWrapperDiv.appendChild(postIt);
    let postit = document.getElementById('postIT');

    //create dirll creator button
    let divMove = document.createElement('BUTTON');
    divMove.innerHTML = '🔨';
    divMove.setAttribute('id', 'divMoveCreator');
    menuWrapperDiv.appendChild(divMove);

    //create dirll creator button
    let drillIt = document.createElement('BUTTON');
    drillIt.innerHTML = '&#128640;';
    drillIt.setAttribute('id', 'drillCreator');
    menuWrapperDiv.appendChild(drillIt);

    //create game menu
    let btn = document.createElement('BUTTON');
    btn.innerHTML = '+';
    btn.setAttribute('id', 'generalMenu');
    menuWrapperDiv.appendChild(btn);
    // toggle game menu (Drill Game)
    btn.addEventListener('click', function () {
        if (!menuCreated) {
            document.getElementById('drillCreator').style.display = 'block';
            document.getElementById('divMoveCreator').style.display = 'block';
            postit.style.display = 'block';
            // btn.innerHTML = '&times;';
            btn.classList.add('turn');
            if (btn.classList.contains('turnback')) btn.classList.remove('turnback');
            menuCreated = true;
            return;
        }
        document.getElementById('drillCreator').style.display = 'none';
        document.getElementById('divMoveCreator').style.display = 'none';
        postit.style.display = 'none';
        // btn.innerHTML = '+';
        btn.classList.remove('turn');
        btn.classList.add('turnback');
        menuCreated = false;
    });


    /*******************************************************************************************
     * 
     * 
     * Drill Game
     * 
     * 
     *******************************************************************************************/

    //variables
    let x,
        y,
        width,
        height,
        divOffset,
        xOfScrollLeft,
        yOfScrollTop,
        enemyIndex = [],
        latestEnemyIndex = enemyIndex, // nur Test-Array
        rotate = -90,
        accelerate = 0,
        spriteCreated = false,
        sprite,
        done = false,
        ELEMENTSTHATARENOTTOBEINCLUDED = ['BR', 'SCRIPT', 'STYLE', 'TITLE', 'META', 'HEAD', 'OPTION', 'OPTGROUP', 'LINK'],
        IDSTHATARENOTTOBEINCLUDED = ['MYWEBDESTROYERIMAGE', 'ENIDNGMESSAGE', 'drillCreator', 'SCOREBOARDRIGHTTOP', 'generalMenu', 'divMoveCreator', 'dustBin', 'trashcan', 'postIT', 'inputwrapper', 'textarea', 'generate', 'cancel', 'outputwrapper', 'closeoutputwrapper', 'menuWrapper', 'closeoutputwrapperbackground', 'timerDiv', 'timer', 'startGameBox', 'setUp', 'createCancelButton', 'createStartButton', 'createFreeplayButton', 'timeSetterButton', 'secSelector', 'upArrow', 'secCounter', 'MinSelector', 'upArrowMin', 'MinCounter', 'downArrowMin', 'secP', 'minP'],
        CLASSNAMESSTHATARENOTTOBEINCLUDED = ['headRow', 'notes', 'notesBox'],
        keyState = {},
        score = 0,
        menuCreated = false,
        moveable = false,
        opacityElem = 0,
        howManyNodesCreated = 0,
        counter = 0,
        clicked = false,
        timerCreated = false,
        settedScore = 0,
        maxScore = 0,
        timerCompleted = false,
        doneSettedScore = false,
        selected = false,
        timerSelected = false,
        freeplay = false,
        sec = 0,
        min = 0;

    //create drill and scoreboard
    document.getElementById('drillCreator').addEventListener('click', startGameSetUp);

    function startGameSetUp() {
        if (!spriteCreated || timerCompleted || doneSettedScore || freeplay) {
            if (spriteCreated && !freeplay) resetGame();

            let startGameBox = document.createElement('div');
            startGameBox.setAttribute('id', 'startGameBox');
            document.body.appendChild(startGameBox);

            let setUp = document.createElement('div');
            setUp.setAttribute('id', 'setUp');
            startGameBox.appendChild(setUp);

            let createFreeplayButton = document.createElement('button');
            createFreeplayButton.setAttribute('id', 'createFreeplayButton');
            if (!freeplay) createFreeplayButton.innerHTML = 'Freeplay';
            else {
                createFreeplayButton.innerHTML = 'Cancel Freeplay';
            }
            setUp.appendChild(createFreeplayButton);
            createFreeplayButton.addEventListener('click', function () {
                selected = true;
                timerSelected = false;
                settedScore = 0;
                min = 0;
                sec = 0;
                freeplay = !freeplay;
                if (!freeplay) resetGame();
                deleteSetUp();
                startGame();
            });

            if (!freeplay) {
                let createStartButton = document.createElement('button');
                createStartButton.setAttribute('id', 'createStartButton');
                createStartButton.innerHTML = 'Set your Time';
                setUp.appendChild(createStartButton);
                createStartButton.addEventListener('click', function () {
                    score = 0;
                    setUp.parentNode.removeChild(setUp);
                    timeSetter();
                });
            }

            let createCancelButton = document.createElement('button');
            createCancelButton.setAttribute('id', 'createCancelButton');
            createCancelButton.innerHTML = 'Cancel';
            setUp.appendChild(createCancelButton);
            createCancelButton.addEventListener('click', function () {
                selected = false;
                timerSelected = false;
                settedScore = 0;
                min = 0;
                sec = 0;
                deleteSetUp();
            });
        }
    }

    function timeSetter() {
        let startGameBox = document.getElementById('startGameBox');

        let setUp = document.createElement('div');
        setUp.setAttribute('id', 'setUp');
        startGameBox.appendChild(setUp);

        createScoreInput(setUp);

        let buttonTimePage = document.createElement('div');
        buttonTimePage.setAttribute('id', 'buttonTimePage');
        setUp.appendChild(buttonTimePage);

        let startButton = document.createElement('button');
        startButton.setAttribute('id', 'startButton');
        if (settedScore >= 10 && (sec >= 10 || min > 0)) {
            timerSelected = true;
            if (startButton.classList.contains('notDone')) startButton.classList.remove('notDone');
            startButton.classList.add('done');
        } else {
            timerSelected = false;
            startButton.classList.add('notDone');
            if (startButton.classList.contains('done')) startButton.classList.remove('done');
        }
        startButton.innerHTML = 'Start';
        buttonTimePage.appendChild(startButton);
        startButton.addEventListener('click', function () {
            if (timerSelected && !startButton.classList.contains('notDone')) {
                selected = true;
                timerSelected = true;
                console.log(maxScore);
                deleteSetUp();
                startGame();
            }
        });

        let backButton = document.createElement('button');
        backButton.setAttribute('id', 'backButton');
        backButton.innerHTML = 'Back ↩';
        buttonTimePage.appendChild(backButton);
        backButton.addEventListener('click', function () {
            deleteSetUp();
            startGameSetUp();
        });
    }

    function createScoreInput(setUp) {
        createReachScoreInput(setUp);
        createScoreMinInput(setUp);
        createScoreSecInput(setUp);
    }

    function createReachScoreInput(setUp) {
        let scoreSelector = document.createElement('div');
        scoreSelector.setAttribute('id', 'ScoreSelector');
        setUp.appendChild(scoreSelector);

        let planeScore = document.createElement('p');
        planeScore.setAttribute('id', 'scoreP');
        planeScore.innerHTML = 'Score:';
        scoreSelector.appendChild(planeScore);

        let up = document.createElement('p');
        up.setAttribute('id', 'upArrowScore');
        up.innerHTML = '▲';
        scoreSelector.appendChild(up);
        up.addEventListener('click', function () {
            settedScore += 10;
            if (settedScore > maxScore) settedScore = 0;
            if (settedScore < 10) scoreCounter.innerHTML = '0' + settedScore;
            else scoreCounter.innerHTML = settedScore;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });

        let scoreCounter = document.createElement('p');
        scoreCounter.setAttribute('id', 'ScoreCounter');
        if (settedScore < 10) scoreCounter.innerHTML = '0' + settedScore;
        else scoreCounter.innerHTML = settedScore;
        scoreSelector.appendChild(scoreCounter);

        let down = document.createElement('p');
        down.setAttribute('id', 'downArrowScore');
        down.innerHTML = '▼';
        scoreSelector.appendChild(down);
        down.addEventListener('click', function () {
            settedScore -= 10;
            if (settedScore < 0) settedScore = maxScore;
            if (settedScore < 10) scoreCounter.innerHTML = '0' + settedScore;
            else scoreCounter.innerHTML = settedScore;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });
    }

    function createScoreMinInput(setUp) {
        let minSelector = document.createElement('div');
        minSelector.setAttribute('id', 'MinSelector');
        setUp.appendChild(minSelector);

        let planeMin = document.createElement('p');
        planeMin.setAttribute('id', 'minP');
        planeMin.innerHTML = 'Min:';
        minSelector.appendChild(planeMin);

        let up = document.createElement('p');
        up.setAttribute('id', 'upArrowMin');
        up.innerHTML = '▲';
        minSelector.appendChild(up);
        up.addEventListener('click', function () {
            min++;
            if (min == 60) min = 0;
            if (min < 10) secCounter.innerHTML = '0' + min;
            else secCounter.innerHTML = min;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });

        let secCounter = document.createElement('p');
        secCounter.setAttribute('id', 'MinCounter');
        if (min < 10) secCounter.innerHTML = '0' + min;
        else secCounter.innerHTML = min;
        minSelector.appendChild(secCounter);

        let down = document.createElement('p');
        down.setAttribute('id', 'downArrowMin');
        down.innerHTML = '▼';
        minSelector.appendChild(down);
        down.addEventListener('click', function () {
            min--;
            if (min < 0) min = 59;
            if (min < 10) secCounter.innerHTML = '0' + min;
            else secCounter.innerHTML = min;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });
    }

    function createScoreSecInput(setUp) {
        let secSelector = document.createElement('div');
        secSelector.setAttribute('id', 'secSelector');
        setUp.appendChild(secSelector);

        let planeSec = document.createElement('p');
        planeSec.setAttribute('id', 'secP');
        planeSec.innerHTML = 'Sec:';
        secSelector.appendChild(planeSec);

        let up = document.createElement('p');
        up.setAttribute('id', 'upArrow');
        up.innerHTML = '▲';
        secSelector.appendChild(up);
        up.addEventListener('click', function () {
            sec++;
            if (sec == 60) sec = 0;
            if (sec < 10) secCounter.innerHTML = '0' + sec;
            else secCounter.innerHTML = sec;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });

        let secCounter = document.createElement('p');
        secCounter.setAttribute('id', 'secCounter');
        if (sec < 10) secCounter.innerHTML = '0' + sec;
        else secCounter.innerHTML = sec;
        secSelector.appendChild(secCounter);

        let down = document.createElement('p');
        down.setAttribute('id', 'downArrow');
        down.innerHTML = '▼';
        secSelector.appendChild(down);
        down.addEventListener('click', function () {
            sec--;
            if (sec < 0) sec = 59;
            if (sec < 10) secCounter.innerHTML = '0' + sec;
            else secCounter.innerHTML = sec;
            let startButtonDOM = document.getElementById('startButton').classList;

            if (settedScore >= 10 && (sec >= 10 || min > 0)) {
                timerSelected = true;
                if (startButtonDOM.contains('notDone')) startButtonDOM.remove('notDone');
                if (!startButtonDOM.contains('done')) startButtonDOM.add('done');
            } else {
                timerSelected = false;
                if (!startButtonDOM.contains('notDone')) startButtonDOM.add('notDone');
                if (startButtonDOM.contains('done')) startButtonDOM.remove('done');
            }
        });
    }

    function startGame() {
        if (!spriteCreated && selected) {
            let drillImg = document.createElement('img');
            drillImg.setAttribute('src', 'http://localhost:5000/static/editor/img/SpaceInvader/drillFinal.png');
            drillImg.setAttribute('id', 'MYWEBDESTROYERIMAGE');
            drillImg.setAttribute('alt', 'drill');
            drillImg.setAttribute('width', '40px');
            document.body.appendChild(drillImg);
            sprite = document.getElementById('MYWEBDESTROYERIMAGE');

            if (!timerCreated && timerSelected) {
                let timer = document.createElement('div');
                timer.setAttribute('id', 'timerDiv');
                let spanTimer = document.createElement('span');
                spanTimer.setAttribute('id', 'timer');
                document.body.appendChild(timer);
                timer.appendChild(spanTimer);
                timerCreated = true;

                document.getElementById('timer').innerHTML = min + ":" + sec;
                startTimer();
            } else timerCreated = false;

            let SCOREBOARD = document.createElement('div');
            SCOREBOARD.setAttribute('id', 'SCOREBOARDRIGHTTOP');
            SCOREBOARD.innerHTML = 'Score: ' + score;
            document.body.appendChild(SCOREBOARD);
            scoreBoard = document.getElementById('SCOREBOARDRIGHTTOP');

            spriteCreated = true;
        }
    }

    // Timer
    function startTimer() {
        let presentTime = document.getElementById('timer').innerHTML,
            timeArray = presentTime.split(/[:]+/),
            m = timeArray[0],
            s = checkSecond((timeArray[1] - 1)),
            timerCompleted = false;

        if (s == 59) m -= 1;
        if (m < 0) timerCompleted = true;

        if (!timerCompleted && !doneSettedScore) {
            document.getElementById('timer').innerHTML = m + ":" + s;
            setTimeout(startTimer, 1000);
        } else if (doneSettedScore) {
            document.getElementById('timer').innerHTML = m + ":" + s;
            alert('You did it in Time!\nTime remaining: ' + m + ':' + s);
            settedScore = 0;
            min = 0;
            sec = 0;
        } else {
            document.getElementById('timer').innerHTML = 00 + ":" + 00;
            alert('You failed! Try again!');
            settedScore = 0;
            min = 0;
            sec = 0;
        }
    }


    function deleteSetUp() {
        document.getElementById('startGameBox').parentNode.removeChild(startGameBox);
    }

    // add zero in front of numbers < 10
    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = "0" + sec
        };
        if (sec < 0) {
            sec = "59"
        };
        return sec;
    }

    //toggle seen game (Drill Game)
    function resetGame() {
        scoreBoard.parentNode.removeChild(scoreBoard);
        sprite.parentNode.removeChild(sprite);
        if (timerSelected) document.getElementById('timerDiv').parentNode.removeChild(document.getElementById('timerDiv'));
        rotate = -90;
        accelerate = 0;
        spriteCreated = false;
        selected = false;
    }

    //keydown
    window.addEventListener('keydown', function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 && !clicked) {
            e.preventDefault();
            keyState[e.keyCode || e.which] = true;
        }
    }, true);

    //keyup
    window.addEventListener('keyup', function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 && !clicked) keyState[e.keyCode || e.which] = false;
    }, true);

    //check W, A, D, Shift buttons if they are pressed
    function gameLoop() {
        if (keyState[37] && spriteCreated && !clicked) {
            rotate += 5;
            sprite.style.transform = 'rotate(' + (-1) * rotate + 'deg)';
        }
        if (keyState[38] && spriteCreated && !clicked) moveSprite(true);
        if (keyState[39] && spriteCreated && !clicked) {
            rotate -= 5;
            sprite.style.transform = 'rotate(' + (-1) * rotate + 'deg)';
        }
        if (keyState[32] && spriteCreated && !clicked) showCoords();
        if (!keyState[38] && spriteCreated && !clicked) moveSprite(false);

        setTimeout(gameLoop, 20);
    }

    gameLoop();

    //move drill (Drill Game)
    function moveSprite(doesAccelerate) {
        x = parseInt(sprite.offsetLeft);
        y = parseInt(sprite.offsetTop);
        xOfScrollLeft = window.pageXOffset;
        yOfScrollTop = window.pageYOffset;

        checkBounds();

        y += Math.sin(((-1) * rotate * Math.PI) / 180) * accelerate;
        x += Math.cos(((-1) * rotate * Math.PI) / 180) * accelerate;

        sprite.style.left = x + 'px';
        sprite.style.top = y + 'px';

        if (rotate <= -360 || rotate >= 360) rotate = 0;
        if (accelerate <= 10 && doesAccelerate) accelerate += 0.1;
        if (accelerate > 0 && !doesAccelerate) accelerate -= 0.1;
    }

    //check if outside of screen
    function checkBounds() {
        let w = window.innerWidth,
            h = window.innerHeight;

        if (x < xOfScrollLeft) x = w + xOfScrollLeft;
        if (x > w + xOfScrollLeft) x = xOfScrollLeft;
        if (y < yOfScrollTop) y = h + yOfScrollTop;
        if (y > h + yOfScrollTop) y = yOfScrollTop;
    }

    //update array of things that can be destroyed
    function updateEnemyIndex() {
        let all = document.getElementsByTagName('*'),
            dummy = 0;
        enemyIndex = [];

        for (let i = 0; i < all.length; i++) {
            if (isDestroyable(all[i])) {
                enemyIndex[dummy] = all[i];
                //enemyIndex[dummy].style.border = '.05vh solid black';
                dummy++;
            }
        }

        if (moveable) {
            for (let i = 0; i < enemyIndex.length; i++) {
                enemyIndex[i].classList.add('mydivheader');
                dragElement(enemyIndex[i]);
            }
            return;
        }
        for (let i = 0; i < enemyIndex.length; i++) {
            enemyIndex[i].classList.remove('mydivheader');
            dragElement(enemyIndex[i]);
        }

    }
    updateEnemyIndex();

    let all = document.getElementsByTagName('*')
    for (let i = 0; i < all.length; i++) {
        if (!generalIgnorer(all[i])) {
            maxScore += 10;
        }
    }

    //returns whether or not 'element' is destryable
    function isDestroyable(element) {
        if (shouldIgnoreElement(element)) return false;
        return true;
    }

    function generalIgnorer(element) {
        if (element.nodeType !== 1)
            return true;
        if (element == document.documentElement ||
            element == document.body)
            return true;
        if (ELEMENTSTHATARENOTTOBEINCLUDED.indexOf(element.tagName) !== -1)
            return true;
        if (element.style.visibility == 'hidden' ||
            element.style.display == 'none' ||
            parseFloat(element.style.opacity) == '0.0')
            return true;
        if (IDSTHATARENOTTOBEINCLUDED.indexOf(element.id) !== -1 ||
            CLASSNAMESSTHATARENOTTOBEINCLUDED.indexOf(element.className) !== -1)
            return true;
    }

    //returns if 'element' should be ignored
    function shouldIgnoreElement(element) {
        let childArray = [];
        if (generalIgnorer(element)) {
            return true;
        }
        childArray = getCount(element, true);
        if (childArray.length > 0) {
            for (let i = 0; i < childArray.length; i++) {
                if (!shouldIgnoreElement(childArray[i])) {
                    return true;
                }
            }
        }

        return false;
    }

    function getCount(parent, getChildrensChildren) {
        let relevantChildren = [],
            children = parent.childNodes.length;
        for (let i = 0; i < children; i++) {
            if (parent.childNodes[i].nodeType == 1) {
                if (getChildrensChildren) {
                    Array.prototype.push.apply(relevantChildren, getCount(parent.childNodes[i], true));
                }
                relevantChildren.push(parent.childNodes[i]);
            }
        }
        return relevantChildren;
    }


    //returns offset of 'el'
    function offset(el) {
        let rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    //game end
    //score output
    //destroy element
    function showCoords() {
        for (let i = 0; i < enemyIndex.length; i++) {
            divOffset = offset(enemyIndex[i]);
            width = enemyIndex[i].offsetWidth;
            height = enemyIndex[i].offsetHeight;


            if (spriteCreated) {
                if ((x >= divOffset.left || x + sprite.offsetWidth * 7 / 10 >= divOffset.left) &&
                    (x <= divOffset.left + width || x + sprite.offsetWidth * 7 / 10 <= divOffset.left + width) &&
                    (y >= divOffset.top || y + sprite.offsetHeight * 7 / 10 >= divOffset.top) &&
                    (y <= divOffset.top + height || y + sprite.offsetHeight * 7 / 10 <= divOffset.top + height)) {
                    enemyIndex[i].style.visibility = 'hidden';
                    score += 10;
                    maxScore -= 10;
                    scoreBoard.innerHTML = 'Score: ' + score;
                    updateEnemyIndex();
                }
            }
        }

        if (enemyIndex.length <= 0 && !done) {
            let endingmessage = document.createElement('div');
            endingmessage.setAttribute('id', 'ENIDNGMESSAGE');
            endingmessage.innerHTML = 'You deleted every single element on this website! Your score: ' + score;
            alert('You deleted every single element on this website! Your score: ' + score);
            document.body.appendChild(endingmessage);
            setTimeout(function () {
                document.body.removeChild(endingmessage);
            }, 8000);
            done = true;
        } else if (score >= settedScore && !doneSettedScore && timerSelected) {
            let endingmessageUncomplete = document.createElement('div');
            endingmessageUncomplete.setAttribute('id', 'ENIDNGMESSAGE');
            endingmessageUncomplete.innerHTML = 'You reached your setted score of ' + settedScore + '!\nTime remaining: ' + min + ':' + sec;
            document.body.appendChild(endingmessageUncomplete);
            setTimeout(function () {
                document.body.removeChild(endingmessageUncomplete);
            }, 8000);
            doneSettedScore = true;
        }
    }


    /*******************************************************************************************
     * 
     * 
     * Move Div Boxes
     * 
     * 
     *******************************************************************************************/
    document.getElementById('divMoveCreator').addEventListener('click', function () {
        //Make the DIV element draggagle
        if (enemyIndex.length != 0) {
            if (moveable) {
                moveable = false;
                updateEnemyIndex();
                return;
            }
            moveable = true;
            updateEnemyIndex();
            return;
        }
        console.log('You already have cleared out all elements on this webiste');
    });

    function dragElement(elmnt) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0,
            elementToDust = false;
        if (document.getElementById(elmnt.className + 'header')) {
            // if present, the header is where you move the DIV from
            document.getElementById(elmnt.className + 'header').onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';

            if (elmnt.style.opacity != '0.5') opacityElem = elmnt.style.opacity;

            if (pos3 >= dustbin.offsetLeft &&
                pos3 <= dustbin.offsetWidth + dustbin.offsetLeft &&
                pos4 >= dustbin.offsetTop &&
                pos4 <= dustbin.offsetHeight + dustbin.offsetTop) {
                elementToDust = true;
                elmnt.style.opacity = '0.5';
                dustBin.setAttribute('src', 'http://localhost:5000/static/editor/img/SpaceInvader/trashOrangeOpened.png');
                return;
            }
            elmnt.style.opacity = opacityElem;
            elementToDust = false;
            dustBin.setAttribute('src', 'http://localhost:5000/static/editor/img/SpaceInvader/trashOrange.png');
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            dustBin.setAttribute('src', 'http://localhost:5000/static/editor/img/SpaceInvader/trashOrange.png');

            if (elementToDust) {
                elmnt.style.visibility = 'hidden';
                showCoords();
            }
        }
    }

    // Disable links
    for (let i = 0; i < enemyIndex.length; i++) {
        if (enemyIndex[i].hasAttribute('href') && !shouldIgnoreElement(enemyIndex[i])) {
            enemyIndex[i].href = 'javascript:void(0)';
        }
    }

    /**********************************
     * Notizzettel
     * *******************************/
    postit.addEventListener('click', createNoteInput);
    let generateButton,
        cancelButton,
        innerTextArea = '',
        inputWrapperBody,
        outputWrapperBody,
        outputWrapperBodyCreated = false,
        closeOutputWrapperBody,
        destroyedNoteOutput = false;

    function createNoteInput() {
        if (!outputWrapperBodyCreated) {
            let closeOutputWrapperBackground = document.createElement('div');
            closeOutputWrapperBackground.setAttribute('id', 'closeoutputwrapperbackground');
            document.body.appendChild(closeOutputWrapperBackground);

            let outputWrapper = document.createElement('div');
            outputWrapper.setAttribute('id', 'outputwrapper');
            document.body.appendChild(outputWrapper);
            outputWrapperBody = document.getElementById('outputwrapper');

            let closeOutputWrapper = document.createElement('button');
            closeOutputWrapper.innerHTML = '&times;';
            closeOutputWrapper.setAttribute('id', 'closeoutputwrapper');
            document.body.appendChild(closeOutputWrapper);

            outputWrapperBodyCreated = true;
        }

        closeOutputWrapperBody = document.getElementById('closeoutputwrapper');
        closeOutputWrapperBody.addEventListener('click', destroyNoteOutput);

        checkNote();
    }

    function checkNote() {
        if (!clicked) {
            createNoteCreator();
            clicked = true;
            return;
        }
        document.body.removeChild(document.getElementById('inputwrapper'));
        clicked = false;
    }

    function destroyNoteOutput() {
        if (!destroyedNoteOutput) {
            outputWrapperBody.style.display = 'none';
            // closeOutputWrapperBody.innerHTML = '+';
            if (!closeOutputWrapperBody.classList.contains('turn')) closeOutputWrapperBody.classList.add('turn');
            if (closeOutputWrapperBody.classList.contains('turnback')) closeOutputWrapperBody.classList.remove('turnback');
            destroyedNoteOutput = true;
            return;
        }
        outputWrapperBody.style.display = 'block';
        // closeOutputWrapperBody.innerHTML = '&times;';
        if (closeOutputWrapperBody.classList.contains('turn')) closeOutputWrapperBody.classList.remove('turn');
        if (!closeOutputWrapperBody.classList.contains('turnback')) closeOutputWrapperBody.classList.add('turnback');
        destroyedNoteOutput = false;
    }

    function createNoteCreator() {
        let inputWrapper = document.createElement('div');
        inputWrapper.setAttribute('id', 'inputwrapper');
        document.body.appendChild(inputWrapper);
        inputWrapperBody = document.getElementById('inputwrapper');

        createNote();
    }

    function createNote() {
        let inputWrapperHeader = document.createElement('h1');
        inputWrapperHeader.innerHTML = 'Create New Note:';
        inputWrapperBody.appendChild(inputWrapperHeader);

        let input = document.createElement('TEXTAREA');
        input.setAttribute('name', 'post');
        input.setAttribute('maxlength', 400);
        input.setAttribute('cols', 30);
        input.setAttribute('rows', 15);
        input.setAttribute('id', 'textarea');
        input.setAttribute('placeholder', 'Leave a note');

        inputWrapperBody.appendChild(input);
        innerTextArea = document.getElementById('textarea');
        innerTextArea.addEventListener('animationend', animationremover);

        let generate = document.createElement('BUTTON');
        generate.innerHTML = 'Add to Page';
        generate.setAttribute('id', 'generate');
        inputWrapperBody.appendChild(generate);

        generateButton = document.getElementById('generate');
        generateButton.addEventListener('click', generateNOTE);

        let cancel = document.createElement('BUTTON');
        cancel.innerHTML = 'Cancel';
        cancel.setAttribute('id', 'cancel');
        inputWrapperBody.appendChild(cancel);

        cancelButton = document.getElementById('cancel');
        cancelButton.addEventListener('click', cancelNOTE);
    }

    // Zeilenumbruch
    function generateNOTE() {
        if (innerTextArea.value.length >= 1) {
            outputWrapperBody.innerHTML += '<div class="notesBox" id="' + howManyNodesCreated + '"><p class="notes">' + innerTextArea.value.trim() + '</p><br><hr class="headRow"></div>';

            for (let i = 0; i < outputWrapperBody.childElementCount; i++) {
                outputWrapperBody.childNodes[i].addEventListener('click', function () {
                    delNote(i)
                });
            }

            howManyNodesCreated++;
            destroyedNoteOutput = true;
            destroyNoteOutput();
            createNoteInput();
            return;
        }
        console.log('Bitte schreiben sie etwas in das Feld');
        innerTextArea.classList.add('shake');
    }

    function animationremover() {
        innerTextArea.classList.remove('shake');
    }

    function cancelNOTE() {
        createNoteInput();
        if (!destroyedNoteOutput) destroyNoteOutput();
    }

    function delNote(i) {
        let elem = outputWrapperBody.childNodes[i];
        elem.style.display = 'none';
        elem.classList.remove('notesBox');

        counter++;
        if (counter == outputWrapperBody.childNodes.length) destroyNoteOutput();
    }
})();