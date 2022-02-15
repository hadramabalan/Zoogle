package zoogle.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import zoogle.security.SecurityConstants;

@Configuration
@EnableWebSecurity  // Use basic Spring security configuration
@ComponentScan(basePackages = "zoogle")
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)// Allow methods to be secured using annotation
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] COOKIES_TO_DESTROY = {
            SecurityConstants.SESSION_COOKIE_NAME,
            SecurityConstants.REMEMBER_ME_COOKIE_NAME
    };

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private AuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    private AuthenticationProvider authenticationProvider;
    

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }

    @Bean
    @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/home").permitAll()
            .antMatchers("/register").permitAll()
                .antMatchers("/ads").permitAll()
                .antMatchers("/ads/{\\d+}").permitAll()
                .antMatchers("/shelters").permitAll()
                .antMatchers("/shelters/{\\d+}").permitAll()

                .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
            .and()
            .authenticationProvider(authenticationProvider)
            .csrf().disable()
            .formLogin()
            .successHandler(authenticationSuccessHandler)
            .failureHandler(authenticationFailureHandler)
            .loginProcessingUrl(SecurityConstants.SECURITY_CHECK_URI)
            .usernameParameter(SecurityConstants.USERNAME_PARAM)
            .passwordParameter(SecurityConstants.PASSWORD_PARAM)
            .and()
            .logout().invalidateHttpSession(true).deleteCookies(COOKIES_TO_DESTROY)
            .logoutUrl(SecurityConstants.LOGOUT_URI).logoutSuccessHandler(logoutSuccessHandler)
            .and().sessionManagement().maximumSessions(1);
    }
}
