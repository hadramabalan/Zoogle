package zoogle.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import zoogle.model.User;

import java.util.*;

public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private User user;

    protected final Set<GrantedAuthority> authorities;

    public UserDetails(User user) {
        Objects.requireNonNull(user);
        this.user = user;
        this.authorities = new HashSet<>();
    }

    public UserDetails(User user, Collection<GrantedAuthority> authorities) {
        Objects.requireNonNull(user);
        Objects.requireNonNull(authorities);
        this.user = user;
        this.authorities = new HashSet<>();
        this.authorities.addAll(authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.unmodifiableCollection(authorities);
    }

    @Override
    public String getPassword() {
        return user.getPass();
    }

    @Override
    public String getUsername() {
        return user.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }

    public void eraseCredentials() {
        user.setPass(null);
    }
}