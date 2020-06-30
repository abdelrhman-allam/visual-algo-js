(function (window) {
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    canvas.width = 256 * 5;
    canvas.height = 256 * 5;

    var Board = function (row, col, size) {
        this.col = col;
        this.row = row;
        this.size = size;
        this.step = 0;
        canvas.width = col * size;
        canvas.height = row * size;

        this.random = function random(){
            
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            this.rgba = "rgba(" + r + "," + g + "," + b; //rgba(135,26,31,0.4286748831988356)
            
            this.board = new Array(row * col);
            for (var j = 0; j < this.board.length; j++) {
                this.board[j] = parseFloat(Math.random()).toFixed(2);
            }
            
            this.render();
        }
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        this.start = async function start(time) {
            for (var i = 0; i < this.board.length; i++) {
              for (var j = 0; j < this.board.length - i - 1; j++) {
                  if(this.board[j+1] < this.board[j]){
                    const tmp = parseFloat(this.board[j+1]);
                    this.board[j+1] = parseFloat(this.board[j]);
                    this.board[j] = tmp;
                  }
                  await this.drawAndWait(time);
              }
            }
        };

        this.merge = function(l, r){

        }
        this.mergeSort = async function(time){

        }

        this.render = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const board = this.board;
            
            for (let i = 0; i < board.length; i += 1) {
                const x = this.size * (i%this.col);
                const y = this.size * Math.floor(i / this.row);
                ctx.beginPath();
                ctx.rect(x, y, this.size, this.size);
                ctx.fillStyle = this.rgba + "," + board[i] + ")";
                ctx.fill();
                ctx.font = "8px";
                ctx.fillStyle = "rgba(255,255,255,1)";
				ctx.fillText((parseFloat(board[i])*100).toFixed(0).toString(),  x+(size/2),y + (size/2));
            }
        }


        this.drawAndWait = async function drawAndWait(time) {
            this.render(time)
            await sleep(time);
        };
    };
    window.VisualBoard = Board;
})(window);
