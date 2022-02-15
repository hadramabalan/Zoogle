/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.dao;

import org.springframework.stereotype.Repository;
import zoogle.model.Animal;

@Repository
public class AnimalDao extends BaseDao<Animal> {

    public AnimalDao() {
        super(Animal.class);
    }

}