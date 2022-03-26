import 'package:flutter/cupertino.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:kosoku/features/splash/utils/native_splash.dart';

class AppLogo extends StatelessWidget {
   final double height;

   const AppLogo({Key? key, required this.height}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Image(
      image: const AssetImage('assets/logo/Kosoku.png'),
      height: height,
      width: 130,
      loadingBuilder: (context, child, progress) {
        if(progress == null) {
          NativeSplashScreen.hideNativeSplash();
        }

        return child;
      },
    );
  }

}
