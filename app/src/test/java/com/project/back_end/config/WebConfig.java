package com.project.back_end.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configure CORS mappings for the application.
     * This ensures cross-origin requests are handled correctly and securely.
     *
     * @param registry CorsRegistry used to configure CORS settings.
     */
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                // Specify allowed origins (use specific frontend URLs for security)
                .allowedOrigins(
                    "http://localhost:3000", // Dev environment
                    "https://your-frontend-domain.com" // Production environment
                )
                // Allow specific HTTP methods for security
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Allow specific headers (you can add more specific headers if needed)
                .allowedHeaders("Content-Type", "Authorization", "Accept")
                // Allow credentials if required (e.g., cookies, authorization headers)
                .allowCredentials(true)
                // Set max age of CORS pre-flight response (in seconds) to reduce pre-flight requests
                .maxAge(3600);  // Cache for 1 hour
    }
}
