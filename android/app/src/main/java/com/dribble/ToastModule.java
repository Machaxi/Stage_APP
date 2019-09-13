package com.dribble;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.Intent;
import android.util.Log;
import org.json.JSONArray;

import java.util.Map;
import java.util.ArrayList;

import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ToastExample";
  }
  
  @ReactMethod
  public void show(String message, int duration) {
    Log.e("message",message);
    ArrayList<String> images = new ArrayList();
    try{
      JSONArray array = new JSONArray(message);
      for(int i = 0;i<array.length();i++){
        images.add(array.getJSONObject(i).getString("image"));
      }

    }catch(Exception e){
      e.printStackTrace();
    }

    //images.add("https://dribble-images.s3.ap-south-1.amazonaws.com/1565332752934_file.jpg");
    //images.add("https://dribble-images.s3.ap-south-1.amazonaws.com/1565332754009_istockphoto-666193798-612x612.jpg");
    //images.add("https://dribble-images.s3.ap-south-1.amazonaws.com/1565332754076_img_a7aec7bdc2c228aa1848cf8f6e4e943b_1530239737429_original.jpg");
    
    //Toast.makeText(getReactApplicationContext(), message, duration).show();
    Intent intent=  new Intent(getReactApplicationContext(),FullImageView.class);
    intent.putExtra("images",images);
    intent.putExtra("position",duration);
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); 
    getReactApplicationContext().startActivity(intent);
  }
}