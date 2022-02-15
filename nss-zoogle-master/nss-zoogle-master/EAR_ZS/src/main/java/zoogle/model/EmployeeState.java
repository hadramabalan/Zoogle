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
public enum EmployeeState {
    ACTIVE("ACTIVE"), DENIED("DENIED"), WAITING("WAITING");

    private final String name;

    EmployeeState(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}