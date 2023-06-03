const controllers = {
  copyCode: (e:any) => {
    //Navigating to where the code is displayed and copy it to clipboard
    navigator.clipboard.writeText(e.target.parentNode.children[0].children[1].textContent)
  }
}
export default controllers;