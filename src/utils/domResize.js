const defaultConfig =  { attributes: true, childList: true, subtree: true };
const defaultCallback = function(mutationsList){
  for(let mutation of mutationsList) {
      if (mutation.type == 'childList') {
          console.log('A child node has been added or removed.');
      }
      else if (mutation.type == 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
      }

      if(mutation.type == 'subtree'){
        console.log(mutation.subtree,'----sub tree----')
      }
  }
}
const BindResize = function(Node, callback = defaultCallback){
  let  domWatcher = new MutationObserver(callback);
  domWatcher.observe(Node, defaultConfig);
  return domWatcher
};


export default BindResize
