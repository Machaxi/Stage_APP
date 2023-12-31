package com.machaxi;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.microsoft.codepush.react.CodePush;
// import com.RNTextInputMask.RNTextInputMaskPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.razorpay.rn.RazorpayPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
//import fr.bamlab.rnimageresizer.ImageResizerPackage;
//import com.imagepicker.ImagePickerPackage;
//import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import java.util.Arrays;
import java.util.List;
import com.machaxi.CustomToastPackage;
import com.facebook.react.PackageList;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.nostra13.universalimageloader.core.assist.ImageScaleType;
import com.nostra13.universalimageloader.utils.L;
import android.graphics.Bitmap;
import com.machaxi.R;




public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // return Arrays.<ReactPackage>asList(
      //     ,
      //       ,
      //      ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //       ,
      //        ,
      //        ,
      //        ,
      //        ,
      //        
      // );
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());

      // packages.add(new MainReactPackage(),
         
            // new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG);
           // new RNTextInputMaskPackage(),
            //new SnackbarPackage());
      // packages.add(new SplashScreenReactPackage());
      // packages.add( new RNSharePackage());
      // packages.add(new ReactNativeYouTube());
      // packages.add(new RNCWebViewPackage());
      // packages.add(new RNBranchPackage());
      // packages.add(new ReactNativeOneSignalPackage());
      // packages.add(new RazorpayPackage());
      // packages.add(new RNFetchBlobPackage());

      //packages.add(new ImageResizerPackage());
      //packages.add(new ImagePickerPackage());
      //packages.add(new RNFSPackage());
      
      // packages.add(new SvgPackage());
      // packages.add(new ReanimatedPackage());
      // packages.add(new LinearGradientPackage());
      // packages.add(new AsyncStoragePackage());
      // packages.add(new VectorIconsPackage());
      // packages.add(new RNGestureHandlerPackage());
       //packages.add(new RNFirebasePackage());
      // packages.add(new SnackbarPackage());
      packages.add(new CustomToastPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
    Branch.getAutoInstance(this);
    //Branch.getTestInstance();
      setImageLoader();
  }

  public static DisplayImageOptions options;



  private void setImageLoader(){
    ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(getApplicationContext()).build();
        L.disableLogging();

        ImageLoader.getInstance().init(config);

        options = new DisplayImageOptions.Builder()
                .showImageForEmptyUri(R.drawable.no_img)
                .showImageOnFail(R.drawable.no_img)
                .showImageOnLoading(R.drawable.no_img)
                .resetViewBeforeLoading(true)
                .cacheInMemory(true).cacheOnDisk(true).considerExifParams(true)
                .imageScaleType(ImageScaleType.EXACTLY)
                .bitmapConfig(Bitmap.Config.RGB_565)
                .build();


  }
}
