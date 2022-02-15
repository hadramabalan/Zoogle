package zoogle.service;

import zoogle.model.User;
import zoogle.dao.UserDao;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import zoogle.security.UserDetails;

@Service
public class UserService {

    // Autowired in contructor
    private final UserDao dao;
    private final PasswordEncoder passwordEncoder;
    
    private Calendar cd = Calendar.getInstance();
    
    @PersistenceContext
    private EntityManager em;

    @Autowired
    public UserService(UserDao dao, PasswordEncoder passwordEncoder) {
        this.dao = dao;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void persist(User user) {
        Objects.requireNonNull(user);
        user.encodePassword(passwordEncoder);
        dao.persist(user);
        em.flush();
    }
    
    @Transactional
    public void update(User user) {
        Objects.requireNonNull(user);
        user.encodePassword(passwordEncoder);
        dao.update(user);
        em.flush();
    }
    
    @Transactional
    public List<User> getPrintableUsers() {
        em.flush();
        List<User> users = new ArrayList();

        for (User u : dao.findAll()){
            if (u.isActive()){
                users.add(new User(u));
            } 
        }
        
        return users;
    }

    @Transactional(readOnly = true)
    public boolean exists(String username) {
        return dao.findByUsername(username) != null;
    }
   

    @Transactional
    public void registerNewUser(String login, String pass, String firstName, 
            String lastName, String mail, String phone){
        User user = new User();
        user.setFirstname(firstName);
        user.setLastname(lastName);
        user.setLogin(login);
        user.setPass(pass);
        user.setMail(mail);
        user.setPhone(phone);
        user.setAdmin(false);
        user.setActive(true);

        // encodes pass as well
        persist(user);
    }
    
    public User getCurrUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        User user = userDetails.getUser();
        User usrPers = dao.findByUsername(user.getLogin());
        
        return usrPers;
    }
}