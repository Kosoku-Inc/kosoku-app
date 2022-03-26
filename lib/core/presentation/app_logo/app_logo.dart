import 'package:flutter/cupertino.dart';

class AppLogo extends StatelessWidget {
   final double fontSize;

  const AppLogo({Key? key, required this.fontSize}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      "Kosoku",
      style: TextStyle(
        fontFamily: "Ascent",
        fontWeight: FontWeight.bold,
        fontSize: fontSize,
      ),
    );
  }

}
