import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import styles from './contract.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage() {
    return (
         <div className={styles.normal}>
            <h1 className={styles.title}>Yay! Welcome to use Coevery.PMS!</h1>
            <div className={styles.welcome} />
        </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
