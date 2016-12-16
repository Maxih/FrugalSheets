import React from 'react';
import GridContainer from '../grid/grid_container';
import SheetNavContainer from '../grid/sheet_nav_container';
import ToolBoxContainer from '../tool/tool_box_container';
import DocHeaderContainer from './doc_header_container';
import { Link, withRouter } from 'react-router';
import Loading from '../loading';

export default class Doc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.loadDocument(this.props.routeParams.documentId).then(
      newDoc => this.setState({loading: false}),
      errors => {
        this.props.router.push("/");
      }
    );
  }

  render() {
    if(this.state.loading)
      return (<Loading />);

    return (

      <section className="doc-wrapper">
        <header className="doc-header">
          <DocHeaderContainer />
        </header>
        <section className="doc-editor">
          <ToolBoxContainer />
        </section>
        <section className="doc">
          <GridContainer />
        </section>
        <section className="sheet-nav">
          <SheetNavContainer />
        </section>
      </section>
    );
  }
}
