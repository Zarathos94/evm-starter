import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  RallyAssignment,
  setMessage,
} from "../generated/RallyAssignment/RallyAssignment";
import { Purpose, Sender } from "../generated/schema";

export function handlesetMessage(event: setMessage): void {
  let senderString = event.params.sender.toHexString();

  let sender = Sender.load(senderString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.sender;
    sender.createdAt = event.block.timestamp;
    sender.messageCount = BigInt.fromI32(1);
  } else {
    sender.messageCount = sender.messageCount.plus(BigInt.fromI32(1));
  }

  let message = new Purpose(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  message.message = event.params.message;
  message.sender = senderString;
  message.createdAt = event.block.timestamp;
  message.transactionHash = event.transaction.hash.toHex();

  message.save();
  sender.save();
}
