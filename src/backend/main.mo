import Principal "mo:core/Principal";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    name : Text;
    email : Text;
    content : Text;
  };

  let messages = List.empty<Message>();

  public shared ({ caller }) func submitMessage(name : Text, email : Text, content : Text) : async () {
    let message : Message = {
      name;
      email;
      content;
    };
    messages.add(message);
  };

  public query ({ caller }) func getAllMessages(owner : Principal) : async [Message] {
    if (not isOwner(caller, owner)) { Runtime.trap("Only owner can get all messages") };
    messages.toArray();
  };

  func isOwner(caller : Principal, owner : Principal) : Bool {
    caller.equal(owner);
  };
};
