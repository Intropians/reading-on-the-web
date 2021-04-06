const readerMode = (function() {

    function setClickEvent(node, event, callback) {
        let trigger = node.querySelector('.trigger');
        trigger.addEventListener(
            event,
            event => callback(node)
        );
    }

    function checkForTextNodeIn(node) {
        var whitespace = /^\s*$/;
        for (var i = 0; i < node.childNodes.length; i++) {
            let childNode = node.childNodes[i];
            if (childNode.nodeType == 3) {
                if (!whitespace.test(childNode.nodeValue)) return true
            }
        }
        return false;
    }

    function getTextNodesIn(node) {
        var textNodes = []; 
    
        function getTextNodes(node) {
            if (node.nodeType == 1 && checkForTextNodeIn(node)) {
                    textNodes.push(node);
            } else {
                for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }
    
        getTextNodes(node);
        return textNodes;
    }

    function obfuscateNode(node, i) {
        let trigger = document.createElement('button');
        trigger.classList.add("trigger");
        node.appendChild(trigger);
        node.classList.add("obfuscate");
        hideNode(node);

    }

    function hideNode(node) {
        let trigger = node.querySelector('.trigger');
        trigger.textContent = '🔷';
        node.setAttribute('data-hidden', true);
    }

    function showNode(node) {
        let trigger = node.querySelector('.trigger');
        trigger.textContent = '🔶';
        node.setAttribute('data-hidden', false);
    }

    function init(elem) {
        const textNodes = getTextNodesIn(elem);
        for (var i = 0; i < textNodes.length; i++) {
            obfuscateNode(textNodes[i]);
            setClickEvent(textNodes[i], 'mousedown', showNode);
            setClickEvent(textNodes[i], 'mouseup', hideNode);
            setClickEvent(textNodes[i], 'mouseleave', hideNode);
        }
        console.log(textNodes);
    }

    return {
        init: init
    }

})();

readerMode.init(document.querySelector("article"));