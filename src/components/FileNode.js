import './FileNode.css';
import React from 'react';
import _ from 'lodash';

import { appState$ } from '../state/appState';
import { dispatch$ } from '../state/dispatch';
import { SELECT_ITEM } from '../state/actions';

class FileNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    
    componentDidMount() {
        this.sub = appState$.subscribe(state => {
            this.setState(Object.assign({}, this.state, state));
        });
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    showChildren() {
        let depth = this.props.depth + 1;
        return this.props.data.children.map((file, index) => {
            return (file) ? <FileNode key={index} index={index} depth={depth} data={file} /> : null;
        })
    }

    open() {
        let name = (this.props.data) ? this.props.data.name : this.props.name;
        dispatch$.next({type: SELECT_ITEM, payload: this.props.index + '_' + name});
        this.setState(Object.assign({}, this.state, {open: !this.state.open}));
    }

    render() {
        let type = (this.props.data) ? this.props.data.type : this.props.type;
        let name = (this.props.data) ? this.props.data.name : this.props.name;
        let nameConcat = name.split('').filter((ch, index) => {
            if (index < 25) {
                return ch;
            }
        }).join('');
        nameConcat = (nameConcat.split('').length === 25) ? nameConcat + '...' : nameConcat;
        let children = (this.props.data && this.props.data.children)
        let privateFolder = (this.props.data && this.props.data.private) ? 'folder-private' : 'folder-public';
        let padding = this.props.depth * 25 + 15;
        return (
            <div>
                <div className="file-node" onClick={() => {this.open()}}>
                    <span className="folder" style={{'marginLeft': `${padding}px`}}>
                         {(type === 'folder') ?
                            <span  className="folder">{(this.state.open) ? 
                                <i className="fa fa-minus-square-o"></i> : 
                                <i className="fa fa-plus-square-o"></i>}</span> :
                            <span className="file"><i className="fa fa-file-text-o"></i></span>}
                        {(children) ?  <i className={`fa fa-folder ${privateFolder}`}></i> : null}
                        <span className="name">{nameConcat}</span>
                    </span>
                </div>
                {(children && this.state.open) ? this.showChildren(): null}
            </div>
        );
    }
}

export default FileNode;