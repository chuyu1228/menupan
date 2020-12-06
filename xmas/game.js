function setOrder() {
                var list = document.querySelector('ul');
                var items = list.querySelectorAll('li');
                var sortedList = Array.from(items).sort(function (a, b) {
                    console.log($(a).find('.score'));
                    var c = parseInt($(a).find('.score').html()),
                        d = parseInt($(b).find('.score').html());
                    console.log(c, d);
                    return c > d ? -1 : c < d ? 1 : 0;
                });
                for (let item of sortedList) {
                    list.appendChild(item);
                }
                //console.log(sortedList);
            }
            function gotPoint(clazz, point) {
                //if(confirm(point > 0 ? 'ㅊㅋㅊㅋ' : 'ㅉㅉㅉ')) {
                $(clazz).html(parseInt($(clazz).html()) + point);
                setOrder();
                //}
            }
            function genQuestion() {
                console.log(randNum());
                $('#question').html(randNum());
            }

            function randNum() {
                let ALPHA = [
                    'ㄱ',
                    'ㄴ',
                    'ㄷ',
                    'ㄹ',
                    'ㅁ',
                    'ㅂ',
                    'ㅅ',
                    'ㅇ',
                    'ㅈ',
                    'ㅊ',
                    'ㅋ',
                    'ㅌ',
                    'ㅍ',
                    'ㅎ',
                ];
                let rN = '';
                for (let i = 0; i < 2; i++) {
                    let randTnum = Math.floor(Math.random() * ALPHA.length);
                    rN += ALPHA[randTnum];
                }
                return rN;
            }

        

            // 요소 초기화.
            function initRand() {
                // 숫자가 출력될 #panel1을 찾아 전역변수에 담아둡니다.
                this.panel1 = document.getElementById('panel1');
                this.nTimerID = 0;
                // 참여인원 정보가 입력된 패널을 찾아 전역변수에 담아둡니다.
                this.labTotal = document.getElementById('lab_total');
                this.nTotalMember = 0;
            }

            // 이벤트 초기화.
            function initEventListener() {
                var btnStart = document.getElementById('btn_start');
                btnStart.addEventListener(
                    'click',
                    function () {
                        startTimer();
                    },
                    false
                );

                var btnStop = document.getElementById('btn_stop');
                btnStop.addEventListener(
                    'click',
                    function () {
                        stopTimer();
                    },
                    false
                );

                var btnReset = document.getElementById('btn_reset');
                btnReset.addEventListener(
                    'click',
                    function () {
                        resetTimer();
                    },
                    false
                );
            }
            // 0.2초에 한번씩 createNumber()함수를 실행시켜 줍니다.
            function startTimer() {
                if (this.nTimerID == 0) {
                    //입력된 참여인원수를 구해옵니다.
                    this.nTotalMember = Number(this.labTotal.value);
                    // 타이머 시작시 #panel1의 글자색을 초기화 시켜 줍니다.
                    this.resetPanelStyle();
                    this.nTimerID = setInterval(this.createNumber, 20);
                }
            }

            // createNumber()함수 호출하는 타이머를 멈춥니다.
            function stopTimer() {
                if (this.nTimerID) {
                    clearInterval(this.nTimerID);
                    this.nTimerID = 0;
                    //출력효과 추가.
                    this.showWinner();

                    //당첨번호를 panel2에 출력
                    this.showResult();
                }
            }

            // 리셋하면 당첨자 목록을 삭제하고, 당첨자 순서 초기화
            function resetTimer() {
                var resultPanel = document.getElementById('panel2');
                resultPanel.innerHTML = '';

                //당첨자 순서 초기화
                resultPanelCnt = 0;
            }

            // 랜덤하게 1에서 참여인원수 사이의 숫자를 만들어 냅니다.
            function createNumber() {
                var nNum = 1 + Math.floor(Math.random() * this.nTotalMember);
                //만들어진 숫자를 innerHTML에 대입시켜 줍니다.
                this.panel1.innerHTML = nNum;
                // 폰트 크기를 100~200으로 랜덤하게 설정해줍니다.
                this.panel1.style.fontSize = 100 + Math.random() * 100 + 'px';
                // 색상을 랜덤하게 설정해줍니다.
                this.panel1.style.color = '#' + parseInt(Math.random() * 0xffffff).toString(16);
            }

            // 출력효과 추가.
            function showWinner() {
                // 당첨자를 알리기 위해서 #panel1의 글자색과 크기를 변경시켜줍니다.
                this.panel1.style.color = '#ff0000';
                this.panel1.style.fontSize = '200px';
            }

            // 출력패널의 스타일을 초기화 시켜준다.
            function resetPanelStyle() {
                this.panel1.style.color = '#000000';
            }

            //당첨 번호를 리스트 형태로 쌓아둔다.
            function showResult() {
                var span = document.createElement('span');
                var Panel1 = document.getElementById('panel1');
                var resultPanel = document.getElementById('panel2');

                resultPanelCnt++;

                console.log(resultPanelCnt + ' 번째 당첨번호 : ' + Panel1.innerHTML);

                span.style.fontSize = '20px';
                span.style.color = 'steelblue';
                span.innerHTML =
                    "<font color='black'>" + resultPanelCnt + '. </font>' + Panel1.innerHTML;

                resultPanel.appendChild(span);
                resultPanel.appendChild(document.createElement('br'));

                //console.log(" resultPanel.clientHeight : " + resultPanel.clientHeight);
                console.log(
                    ' resultPanel.offsetHeight : ' +
                        resultPanel.offsetHeight +
                        ' || resultPanel.scrollHeight :  ' +
                        resultPanel.scrollHeight
                );

                //만약 당첨자의 목록이 panel2를 overflow 하면 아래로 자동 스크롤하시오.
                if (resultPanel.offsetHeight < resultPanel.scrollHeight) {
                    //console.log("내용이 많아졌다.");
                    resultPanel.scrollTop = resultPanel.scrollHeight - resultPanel.offsetHeight;
                }
            }