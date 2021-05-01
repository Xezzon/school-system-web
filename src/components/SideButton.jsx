import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

function SideButton({children}) {
    return (
        <div className="side-toolbar btn-group-vertical" style={{ position: 'fixed', bottom: '3rem', right: '1rem' }}>
            <button
                type="button"
                className="bg-transparent btn btn-light m-2"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                <ArrowUpOutlined />
            </button>
            {children}
            <button
                type="button"
                className="bg-transparent btn btn-light m-2"
                onClick={() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
            >
                <ArrowDownOutlined />
            </button>
        </div>
    );
}

export default SideButton;