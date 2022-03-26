import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:kosoku/features/splash/presentation/splash_screen.dart';

extension NativeSplashScreen on SplashScreen {
  static hideNativeSplash() {
    Future
        .delayed(const Duration(milliseconds: 400))
        .then((value) {
          FlutterNativeSplash.remove();
        });
  }

  static preserveNativeSplash() {
    WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
    FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  }
}
