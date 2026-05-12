import { Modal, message } from "antd";
import { DeleteTheatre} from "../../api/theatres";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheatreModal = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    getData,
}) => {

    const dispatch = useDispatch();
    const handleOk = async () => {
        try {
            dispatch(ShowLoading());
            const theatreId= selectedTheatre._id;
            const response = await DeleteTheatre( theatreId );
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            setSelectedTheatre(null);
            setIsDeleteModalOpen(false);
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            setIsDeleteModalOpen(false);
            message.error(err.message);
        }
    };
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedTheatre(null);
    };
    return (
        <Modal
            title="Delete Theatre?"
            open={isDeleteModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Are you sure you want to delete this Theatre?</p>
            <p> This action can't be undone and you'll lose this Theatre data.</p>
        </Modal>
    );
};
export default DeleteTheatreModal