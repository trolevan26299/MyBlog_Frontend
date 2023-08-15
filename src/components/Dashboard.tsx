import React, { useState, useEffect } from 'react';
import { requestApi } from '../helpers/api';
import { DashboardDto } from '../Definition/user.dto';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../Redux/actions/index';
import TotalOrderChartComponent from './chart/TotalOrderChart';
import PieChart from './chart/PieChartcategory';
import ColumnChart from './chart/NewCustomerChart';
import LineChart from './chart/RevenueByMonth';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState<DashboardDto>({});

  useEffect(() => {
    const promiseUser = requestApi('/users', 'GET');
    const promisePost = requestApi('/posts', 'GET');
    const promiseCategory = requestApi('/category', 'GET');
    const promiseCustomer = requestApi('/customer', 'GET');
    dispatch(actions.controlLoading(true));
    Promise.all([promiseUser, promisePost, promiseCategory, promiseCustomer])
      .then((res) => {
        dispatch(actions.controlLoading(false));
        setDashboardData({
          ...dashboardData,
          totalUser: res[0].data.totalCount,
          totalMedicine: res[1].data.totalCount,
          totalCategory: res[2].data.totalCount,
          totalCustomer: res[3].data.totalCount,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>

          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">
                  Total Users
                  {dashboardData.totalUser && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalUser}
                    </span>
                  )}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link className="small text-white stretched-link" to="/users">
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">
                  Total Medicines
                  {dashboardData.totalMedicine && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalMedicine}
                    </span>
                  )}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/medicines" className="small text-white stretched-link">
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">
                  Total Categorys
                  {dashboardData.totalCategory && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalCategory}
                    </span>
                  )}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/categorys" className="small text-white stretched-link">
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">
                  Total Customers
                  {dashboardData.totalCustomer && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalCustomer}
                    </span>
                  )}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/customers" className="small text-white stretched-link">
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TotalOrderChartComponent />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px' }}>
            <div style={{ width: '32%' }}>
              <PieChart />
            </div>
            <div style={{ width: '32%' }}>
              <ColumnChart />
            </div>
            <div style={{ width: '32%' }}>
              <LineChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
