import "src/tree.dart";

void main() {
  Tree t = new Tree();
  t.addOpr("p0", 5, ["p1", "p2"]);
  t.addOpr("p0", 19, ["p3"]);
  t.addOpr("p0", 8, ["p5", "p4"]);
  t.addOpr("p4", 20, ["p11", "p12"]);
  t.addOpr("p4", 10, ["p10"]);
  
  print(t);
}
