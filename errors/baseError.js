export function setError(status = 400, msg = "Unexpected Error", type = "Unidentified") {
   this.status = status
   this.msg = msg;
   this.type = type;
}