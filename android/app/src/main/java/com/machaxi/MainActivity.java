package com.machaxi;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import io.branch.rnbranch.*; // <-- add this
import android.content.Intent; // <-- and this
import android.util.Log;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // here


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Dribble";
    }
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        //Crashlytics.log(Log.DEBUG, "tag", "message");
        //Crashlytics.getInstance().crash(); // Force a crash
//
//        logReportAndPrint();
//        logReportOnly();
//        enableAtRuntime();
//        enableDebugMode();
//        forceACrash();
    }



      @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
