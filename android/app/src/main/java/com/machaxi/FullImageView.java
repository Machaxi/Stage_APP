package com.machaxi;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import androidx.viewpager.widget.PagerAdapter;
import androidx.viewpager.widget.ViewPager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.assist.FailReason;
import com.nostra13.universalimageloader.core.listener.SimpleImageLoadingListener;
import com.machaxi.R;
import com.machaxi.TouchImageView;
import com.machaxi.MainApplication;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;


public class FullImageView extends AppCompatActivity {

    Context mContext;
    ImageLoader imageloader;
    Activity mActivity;
    ArrayList<String> images;
    int position = 0;
    LinearLayout top_action_layout;
    int rotatePosition;
    ViewPager mViewPager;

    @SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mContext = FullImageView.this;
        mActivity = FullImageView.this;

        setContentView(R.layout.full_view_image);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)
            getWindow().setStatusBarColor(Color.BLACK);

        Bundle bundle = getIntent().getExtras();
        images = (ArrayList<String>) bundle.getSerializable("images");
        position = bundle.getInt("position",0);
        imageloader = ImageLoader.getInstance();

        mViewPager = findViewById(R.id.view_pager);
        mViewPager.setAdapter(new TouchImageAdapter());
        mViewPager.setCurrentItem(position);

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        switch (id) {


            case android.R.id.home:
                finish();
                break;


            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    public class TouchImageAdapter extends PagerAdapter {

        private LayoutInflater inflater;

        @Override
        public int getCount() {
            return images.size();
        }

        @Override
        public View instantiateItem(ViewGroup container, int position) {

            inflater = (LayoutInflater) container.getContext()
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

            View imageLayout = inflater.inflate(R.layout.item_pager_image,
                    container, false);

            imageLayout.setTag("View" + position);

            final TouchImageView img = imageLayout
                    .findViewById(R.id.image);
            final ProgressBar spinner = imageLayout
                    .findViewById(R.id.loading);

            if (getIntent().getBooleanExtra("is_local", false)) {
                imageloader.displayImage("file:///"+images.get(position), img, MainApplication.options);
            } else {

                imageloader.displayImage(images.get(position), img, MainApplication.options,
                        new SimpleImageLoadingListener() {
                            @Override
                            public void onLoadingStarted(String imageUri,
                                                         View view) {
                                spinner.setVisibility(View.VISIBLE);
                            }

                            @Override
                            public void onLoadingFailed(String imageUri,
                                                        View view, FailReason failReason) {
                                String message = null;
                                switch (failReason.getType()) {
                                    case IO_ERROR:
                                        message = "Input/Output error";
                                        break;
                                    case DECODING_ERROR:
                                        message = "Image can't be decoded";
                                        break;
                                    case NETWORK_DENIED:
                                        message = "Downloads are denied";
                                        break;
                                    case OUT_OF_MEMORY:
                                        message = "Out Of Memory error";
                                        break;
                                    case UNKNOWN:
                                        message = "Unknown error";
                                        break;
                                }
                                Toast.makeText(mContext, message,
                                        Toast.LENGTH_LONG).show();
                                Log.i("", "image load failed");

                                spinner.setVisibility(View.GONE);
                            }

                            @Override
                            public void onLoadingComplete(String imageUri,
                                                          View view, Bitmap loadedImage) {
                                Log.i("", "onLoadingComplete");
                                spinner.setVisibility(View.GONE);
                            }
                        });
            }
            container.addView(imageLayout, 0);
            return imageLayout;
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView((View) object);
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == object;
        }

    }

}
