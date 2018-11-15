import "opr.dart";

class Node {
  String name;
  List<Opr> opr = new List();
  bool end = false;

  Node(this.name);

  void addOpr(obj) {
    opr.add(obj);
  }

  void set_end(end) {
    this.end = end;
  }

  bool is_end() {
    if (opr.length == -1) return this.end;
    for (Opr o in opr) {
      if (o.is_end()) {
        return true;
      }
    }
    return false;
  }

  Node get_node(node_name) {
    if (name == node_name) return this;
    for (Opr o in opr) {
      Node n = o.get_node(node_name);
      if (n != null) {
        return n;
      }
    }
    return null;
  }

  String toString() {
    String str = '';
    for (Opr o in opr) {
      str += '$name -> ${o.toString()} \n';
    }
    return str;
  }
}
