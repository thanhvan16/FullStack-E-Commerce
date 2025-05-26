import { useEffect } from "react";
import { useState } from "react";
import SummaryApi from "../../common";
import ROLE from "../../common/role";
import moment from 'moment'
import { toast } from "react-toastify";
import 'moment/locale/vi'; 
moment.locale('vi');

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Lấy tất cả các User 
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const dataResponse = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            })
            const dataApi = await dataResponse.json()
            if (dataApi.success) {
                setUsers(dataApi.data)
            }
            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    // Thay đổi quyền User 
    const handleChangeRole = async(id)=>{
       const userToUpdate= users.find(user=> user._id===id)
       const newRole = userToUpdate.role===ROLE.USER ? ROLE.ADMIN : ROLE.USER
       const dataResponse= await fetch(SummaryApi.updateUser.url,{
        method: SummaryApi.updateUser.method,
        credentials:'include',
        headers:{
            'content-type': 'application/json',

        },
        body: JSON.stringify({
            userId: id,
            role: newRole

        }),
       
       })
       const dataApi= await dataResponse.json()
       console.log(dataApi.data)
       if(dataApi.success){
        toast.success(dataApi.message)
        fetchAllUsers()
       }
    }


   // Xóa người dùng 
    const handleDeleteUser = async(id)=>{
       if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) return;

       const dataResponse= await fetch(SummaryApi.deleteUser.url,{
        method: SummaryApi.deleteUser.method,
        credentials:'include',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            userId:id
        })
       })
       const dataApi= await dataResponse.json()
       console.log("dataApi", dataApi)
       if(dataApi.success){
        toast.success(dataApi.message)
        fetchAllUsers()
       }
       if(dataApi.error){
        toast.error(dataApi.message)
       }
    }

    return (
        <div className="container-fluid px-4 py-5">
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                    <h4 className="mb-0 text-primary">
                        <i className="fas fa-users me-2"></i>
                        Quản lý người dùng
                    </h4>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center" style={{width: '60px'}}>STT</th>
                                        <th>Tên người dùng</th>
                                        <th>Email</th>
                                        <th>Ngày đăng ký</th>
                                        <th className="text-center">Quyền hạn</th>
                                        <th className="text-center" style={{width: '100px'}}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(user => user.role === ROLE.USER).map((user, index) => (
                                        <tr key={user?._id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle me-2">
                                                        {user?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>{user?.name}</div>
                                                </div>
                                            </td>
                                            <td>{user?.email}</td>
                                            <td>{moment(user?.createdAt).format('LL')}</td>
                                            <td className="text-center">
                                                <button 
                                                    className={`btn btn-sm ${user.role === ROLE.USER ? 'btn-outline-primary' : 'btn-outline-danger'}`}
                                                    onClick={() => handleChangeRole(user?._id)}
                                                >
                                                    <i className={`fas fa-${user.role === ROLE.USER ? 'user' : 'user-shield'} me-1`}></i>
                                                    {user?.role === ROLE.USER ? "Người dùng" : "Quản trị"}
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-sm btn-outline-danger" 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    title="Xóa người dùng"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .avatar-circle {
                    width: 35px;
                    height: 35px;
                    background-color: #e9ecef;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #6c757d;
                }
                .table th {
                    font-weight: 600;
                    white-space: nowrap;
                }
                .table td {
                    vertical-align: middle;
                }
                .btn-sm {
                    padding: 0.25rem 0.75rem;
                }
            `}</style>
        </div>
    )
}

export default Users;