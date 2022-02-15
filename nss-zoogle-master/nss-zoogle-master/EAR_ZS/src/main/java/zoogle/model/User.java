package zoogle.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Table(name = "users")
@NamedQueries({
        @NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.login = :login")
})
public class User extends AbstractEntity {

    public User (){}
    public User(User u){
        this.id = u.getId();
        this.firstname = u.getFirstname();
        this.lastname = u.getLastname();
        this.login = u.getLogin();
        this.pass = u.getPass();
        this.mail = u.getMail();
        this.phone = u.getPhone();
        this.admin = u.isAdmin();
        this.active = u.isActive();
    }
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String firstname;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String lastname;
    
    @Basic(optional = false)
    @Column(nullable = false, unique = true)
    private String login;

    @Basic(optional = false)
    @Column(nullable = false)
    private String pass;

    @Basic(optional = false)
    @Column(nullable = false, unique = true)
    private String mail;
    
    @Basic(optional = false)
    @Column
    private String phone;

    @Basic(optional = false)
    @Column(nullable = false)
    private boolean admin;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private boolean active;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name="shelter_employee",
            joinColumns=@JoinColumn(name="userId"),
            inverseJoinColumns=@JoinColumn(name="shelterId"))
    private List<Shelter> shelters;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<ShelterEmployee> shelterRecords;

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }    
    
    public List<Shelter> getShelters() {
        return shelters;
    }

    public List<ShelterEmployee> getShelterRecords() {
        return shelterRecords;
    }

    public void setShelters(List<Shelter> shelters) {
        this.shelters = shelters;
    }

    public void setShelterRecords(List<ShelterEmployee> shelterRecords) {
        this.shelterRecords = shelterRecords;
    }
    
    
    
    public void encodePassword(PasswordEncoder encoder) {
        this.pass = encoder.encode(pass);
    }
    
    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getLogin() {
        return login;
    }

    public String getPass() {
        return pass;
    }

    public String getPhone() {
        return phone;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    @Override
    public String toString() {
        return "<br>User" + login + " with id "+id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    
}