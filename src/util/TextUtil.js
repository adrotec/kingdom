export class TextUtil {
  labelize(str) {
      return str.replace(/([A-Z])/g, ' $1')
              // uppercase the first character
              .replace(/^./, function(str) {
                  return str.toUpperCase();
              }).replace(' Of ', ' of ');
  }
  lowerCaseFirst(str){
      return str.substr(0, 1).toLowerCase() + str.slice(1);
  }
  upperCaseFirst(str){
      return str.substr(0, 1).toUpperCase() + str.slice(1);            
  }
}