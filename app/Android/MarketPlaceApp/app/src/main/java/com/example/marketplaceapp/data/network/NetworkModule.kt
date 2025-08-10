package com.example.marketplaceapp.data.network

import com.example.marketplaceapp.data.api.ProductApiService
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

/**
 * Network module providing Retrofit configuration and API service instances.
 */
object NetworkModule {
    
    // For Android Emulator: use 10.0.2.2 to access host machine
    // For Physical Device: use your machine's IP address (e.g., "http://192.168.1.100:8080/")
    // For now, defaulting to emulator configuration
    private const val BASE_URL = "http://10.0.2.2:8080/"
    private const val CONNECT_TIMEOUT = 30L
    private const val READ_TIMEOUT = 30L
    
    /**
     * Provides HTTP client with logging interceptor for debugging.
     */
    private val okHttpClient: OkHttpClient by lazy {
        val loggingInterceptor = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        
        OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .connectTimeout(CONNECT_TIMEOUT, TimeUnit.SECONDS)
            .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)
            .build()
    }
    
    /**
     * Provides Retrofit instance configured with base URL and converters.
     */
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    
    /**
     * Provides ProductApiService instance.
     */
    val productApiService: ProductApiService by lazy {
        retrofit.create(ProductApiService::class.java)
    }
}
