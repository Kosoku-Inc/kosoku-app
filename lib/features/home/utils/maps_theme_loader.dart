import 'package:flutter/services.dart' show rootBundle;

Future<String> getMapsStyle() {
  return rootBundle.loadString('assets/maps/style.json');
}
