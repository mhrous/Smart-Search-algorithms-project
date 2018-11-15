import "node.dart";

class Opr {
  List<Node> nodes = new List();
  int cost;

  Opr(this.cost);

  void addNode(node) {
    nodes.add(node);
  }

  bool is_end() {
    for (Node n in nodes) {
      if (!n.is_end()) {
        return false;
      }
    }
    return true;
  }

  Node get_node(node_name) {
    for (Node n in nodes) {
      Node nn = n.get_node(node_name);
      if (nn != null) {
        return nn;
      }
    }
    return null;
  }

  String toString() {
    String str = '${nodes[0].name} ';
    for (int i = 1; i < nodes.length; i++) {
      str += '& ${nodes[i].name} ';
    }
    str += "\n";
    for (int i = 0; i < nodes.length; i++) {
      str += '${nodes[i].toString()}';
    }

    return str;
  }
}
