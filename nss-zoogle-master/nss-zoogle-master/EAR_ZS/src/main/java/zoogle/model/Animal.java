/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "animals")
public class Animal extends AbstractEntity {
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String name;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private Integer age;
    
    @Basic(optional = false)
    @Column(nullable = false)
    private String sex;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalSpecies species;

    public Animal() {}
    public Animal(Animal anim) {
        this.id = anim.getId();
        this.name = anim.getName();
        this.age = anim.getAge();
        this.sex = anim.getSex();
        this.species = anim.getSpecies();
    }
    
    
    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }

    public String getSex() {
        return sex;
    }

    public AnimalSpecies getSpecies() {
        return species;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setSpecies(AnimalSpecies species) {
        this.species = species;
    }    
    
}
