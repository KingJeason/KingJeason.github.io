function add(a, b) {
    return (parseInt(a, 2) + parseInt(b, 2)).toString(2)
}
function minus(a, b) {
    return (parseInt(a, 2) - parseInt(b, 2)).toString(2)
}
function mul(a, b) {
    return (parseInt(a, 2) * parseInt(b, 2)).toString(2)
}
function div(a, b) {
    return (parseInt(a, 2) / parseInt(b, 2)).toString(2)
}
window.onload = function () {
    Calculator.initListeners()
}
// 全局计算对象
let Calculator = (function () {
    let cal = {
        cache: {
            showInput: document.getElementById("res")
        },
        //操作数栈
        operandStack: [],
        //运算符栈
        operatorStack: [],
        //如果为true，那么接下来输入的数字需要覆盖在showInput上，而不是追加
        /**
          * 工具方法，为element添加事件处理函数
          * @param element 需要添加事件的dom元素
          * @param name name事件名称(不含on)
          * @param handler 事件处理函数
          */
        addEvent: function (element, name, handler) {
            if (window.addEventListener) {
                element.addEventListener(name, handler);
            } else if (window.attachEvent) {
                element.attachEvent("on" + name, handler);
            }
        },
        add: function (a, b) {
            console.log(a, b)
            return (parseInt(a, 2) + parseInt(b, 2)).toString(2)

        },
        minus: function (a, b) {
            return (parseInt(a, 2) - parseInt(b, 2)).toString(2)

        },
        mul: function (a, b) {
            return (parseInt(a, 2) * parseInt(b, 2)).toString(2)

        },
        div: function (a, b) {
            return (parseInt(a, 2) / parseInt(b, 2)).toString(2)
        },
        /**
        * 获取cache.showInput的内容
        * @return String
        */
        getShowInput: function () {
            return cal.cache.showInput.innerHTML;
        },
        // 初始化事件监听器
        initListeners: function () {
            var buttons = document.getElementsByTagName("button");
            cal.rebuildButtons(buttons);
        },
        // 事件监听器集合
        listeners: {
            /**
             * 按键按下事件监听
             */
            keyPressListener: function (e) {
                var event = e || window.event;
                console.log(e)
                cal.handleKey(event.target.textContent);
            }
        },
        /**
        * 相应按键按下事件
        * @param value 按键的value值(即其keyCode)
        */
        handleKey: function (value) {
            if (value === '0' || value === '1') {
                cal.showInput(value)
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                cal.operandStack.push(cal.cache.showInput.innerHTML)
                console.log(cal.operandStack)
                cal.operatorStack.push(value)
                cal.showInput(value)
            } else if (value === 'C') {
                cal.setShowInput('0')
                cal.operandStack = []
                cal.operatorStack = []
            } else if (value === '=') {
                let oper = cal.operatorStack[0]
                let index = cal.cache.showInput.innerHTML.indexOf(oper)
                cal.operandStack.push(cal.cache.showInput.innerHTML.slice(index + 1))
                if (oper === '+') {
                    cal.setShowInput(cal.add(cal.operandStack[0], cal.operandStack[1]))
                } else if (oper === '-') {
                    cal.setShowInput(cal.minus(cal.operandStack[0], cal.operandStack[1]))
                } else if (oper === '*') {
                    cal.setShowInput(cal.mul(cal.operandStack[0], cal.operandStack[1]))
                } else if (oper === '/') {
                    cal.setShowInput(cal.div(cal.operandStack[0], cal.operandStack[1]))
                }
                cal.operandStack = []
                cal.operatorStack = []
                console.log(cal.operandStack, cal.operatorStack)
            }

        },
        /**
         * 显示输入的内容
         * 用于相应数字/小数点按键
         * @param value 按键的内容，不是keyCode
         */
        showInput: function (value) {
            value = cal.cache.showInput.innerHTML + value
            cal.setShowInput(value);
        },
        /**
         * 设置showInput的值
        * @param value
        */
        setShowInput: function (value) {
            cal.cache.showInput.innerHTML = value;
        },
        /**
        * 重新设置按键
        * @param lis 按钮集合
        * @param mouseOutListener function 鼠标移出时采用哪个监听函数，取决于按钮的位置(上排/下排)
        */
        rebuildButtons: function (lis) {
            var li;
            for (var i = 0, l = lis.length; i < l; ++i) {
                li = lis[i];
                cal.addEvent(li, "click", cal.listeners.keyPressListener);
            }
        }
    }
    return cal
})()