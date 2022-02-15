/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.model;

/**
 *
 * @author Hp
 */
public enum AnimalSpecies {
    DOG("dog"), CAT("cat"), BIRD("bird"), RODENT("rodent"), OTHER("other");

    private final String name;

    AnimalSpecies(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}