import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kosoku/core/utils/style/colors.dart';

class Themes {
  static final lightTheme = ThemeData(
    scaffoldBackgroundColor: AppColors.backgroundGrey,
    fontFamily: 'SFPro',
    //appBarTheme: const AppBarTheme(systemOverlayStyle: SystemUiOverlayStyle(statusBarBrightness: Brightness.dark)),
    colorScheme: const ColorScheme(
      brightness: Brightness.light,
      primary: AppColors.white,
      onPrimary: AppColors.darkerGrey,
      secondary: AppColors.red,
      onSecondary: AppColors.white,
      background: AppColors.backgroundGrey,
      onBackground: AppColors.black,
      error: AppColors.red,
      onError: AppColors.white,
      surface: AppColors.white,
      onSurface: AppColors.black
    )
  );
}
