/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Hp
 */
@Entity
@Table(name = "shelters")
@NamedQueries({
        @NamedQuery(name = "Shelter.findUnapproved", query = "SELECT s FROM Shelter s WHERE s.approved = false AND s.active = true")
})
public class Shelter extends AbstractEntity {

    @Basic(optional = false)
    @Column(nullable = false)
    private String name;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String mail;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String phone;

    @Basic(optional = false)
    @Column(nullable = false)
    private String country;


    @Basic(optional = false)
    @Column(nullable = false)
    private String city;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String street;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String zip;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private boolean approved;


    @Basic(optional = false)
    @Column(nullable = false)
    private boolean active;
    
    public Shelter (){}
    public Shelter(Shelter shel){
        this.id = shel.getId();
        this.name = shel.getName();
        this.mail = shel.getMail();
        this.phone = shel.getPhone();
        this.country = shel.getCountry();
        this.city = shel.getCity();
        this.street = shel.getStreet();
        this.zip = shel.getZip();
        this.approved = shel.isApproved();
        this.active = shel.isActive();
    }

    @JsonIgnore
    @ManyToMany
    @JoinTable(name="shelter_employee",
            joinColumns=@JoinColumn(name="shelterId"),
            inverseJoinColumns=@JoinColumn(name="userId"))
    private List<User> users;

    @JsonIgnore
    @OneToMany(mappedBy = "shelter")
    private List<ShelterEmployee> employeeRecords;

    public List<User> getUsers() {
        return users;
    }

    public List<ShelterEmployee> getEmployeeRecords() {
        return employeeRecords;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setEmployeeRecords(List<ShelterEmployee> employeeRecords) {
        this.employeeRecords = employeeRecords;
    }

    public String getName() {
        return name;
    }

    public String getMail() {
        return mail;
    }

    public String getPhone() {
        return phone;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getStreet() {
        return street;
    }

    public String getZip() {
        return zip;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
    
    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    
    @Override
    public String toString() {
        return "<br>User" + name + " with id "+id;
    }
    
}
