import "node.dart";
import 'opr.dart';

class Tree {
  Node head;
  Tree() {
    head = new Node("p0");
  }

  addOpr(name, cost, nodes) {
    Node n = head.get_node(name);
    Opr o = new Opr(cost);
    for (String str in nodes) {
      o.addNode(new Node(str));
    }
    n.addOpr(o);
  }

@override
  String toString() {
    return head.toString();
  }
}
