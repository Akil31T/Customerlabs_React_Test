import React, { useState } from 'react';
import SegmentBuilder from './component/segment-builder';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <SegmentBuilder />
    </main>
  );
}

export default App;
