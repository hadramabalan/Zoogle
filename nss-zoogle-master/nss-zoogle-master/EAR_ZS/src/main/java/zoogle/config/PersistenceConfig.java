
package zoogle.config;

import java.util.Properties;
import javax.persistence.EntityManagerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@Configuration
@ComponentScan(basePackages = "zoogle.dao")
public class PersistenceConfig {
    
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(){
        final LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setPersistenceUnitName("PersistenceUnit");
//        emf.setJpaVendorAdapter(new EclipseLinkJpaVendorAdapter());
//        emf.setPackagesToScan("planner.model");
        
        final Properties props = new Properties();
//        props.setProperty("generateDdl", "true");
//        props.setProperty("showSql", "true");
        props.setProperty("eclipselink.weaving", "static");
        emf.setJpaProperties(props);
        return emf;
    }

    @Bean(name = "txManager")
    JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        return transactionManager;
    }
}
